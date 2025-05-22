from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets, status, generics
from .models import CustomUser, Course, Issues
from .serializers import CustomUserSerializer, CourseSerializer, IssuesSerializer ,RegisterSerializer, LoginSerializer, LogoutSerializer, CreateIssue, AssignIssueSerializer, UserprofileSerializer
from .permissions import IsOwnerOrIslecturerOrRegistrar,IsIssueOwner,IsRegistrar,IsLecturer,IsStudent
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.decorators import login_required
from django.shortcuts import render





class RegisterView(APIView): 
    permission_classes = [AllowAny] 
    
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            
            user = serializer.save()
            return Response(
                {
                    "message": "User registered successfully",
                    "user": {
                        "id": user.id,
                        "username": user.username,
                        "email": user.email,
                        "role": user.role,
                        "year_of_study": user.year_of_study,
                        "number_type": user.number_type,
                        "student_number": user.student_number,
                        "lecturer_number": user.lecturer_number,
                        "registrar_number": user.registrar_number,
                    }
                },
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data["user"]
            refresh = RefreshToken.for_user(user)
            return Response(
                {
                    "message": "Login successful",
                    "user": {
                        "id": user.id,
                        "username": user.username,
                        "email": user.email,
                        "role": user.role,
                        "number_type": user.number_type,
                    },
                    "accessToken": str(refresh.access_token),
                    "refreshToken": str(refresh)
                },
                status=status.HTTP_200_OK
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self,request):
        serializer = LogoutSerializer(data=request.data)
        if serializer.is_valid():
            refresh_token = serializer.validated_data["refresh_token"]
            try:
                token = RefreshToken(refresh_token)
                token.blacklist()
                return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)        

class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated]

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer 
    permission_classes = [IsAuthenticated] 

class IssuesViewSet(viewsets.ModelViewSet):
    queryset = Issues.objects.all()
    serializer_class = IssuesSerializer    
    permission_classes = [IsAuthenticated, IsOwnerOrIslecturerOrRegistrar]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'student':
            return Issues.objects.filter(student=user)
        return Issues.objects.all()   
    
class CreateIssueView(generics.CreateAPIView):
    serializer_class = CreateIssue
    permission_classes = [IsStudent]

    def perform_create(self, serializer):
        serializer.save(student=self.request.user)

class RegistrarIssueListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated, IsRegistrar]
    serializer_class = IssuesSerializer

    def get_queryset(self):
        return Issues.objects.filter(status='pending', academic_registrar=None)

class AssignIssueView(APIView):
    permission_classes = [IsAuthenticated, IsRegistrar]

    def patch(self, request, pk):
        serializer = AssignIssueSerializer(data = request.data)

        if serializer.is_valid(raise_exception=True):
            lecturer_username = serializer.validated_data['lecturer_username']

        if not lecturer_username:
            return Response({"error": "Lecturer username is required"}, status=status.HTTP_400_BAD_REQUEST)

        lecturer = get_object_or_404(CustomUser, username=lecturer_username, role="lecturer")

        issue = get_object_or_404(Issues, pk=pk)
        issue.lecturer = lecturer  
        issue.save()

        return Response({
            "Message": "Issue assigned successfully",
            "issue": IssuesSerializer(issue).data
        }, status=status.HTTP_200_OK)   

       

class StudentIssueHistoryView(generics.ListAPIView):
    serializer_class = IssuesSerializer
    permission_classes = [IsAuthenticated, IsStudent]  

    def get_queryset(self):
        return Issues.objects.filter(student=self.request.user).order_by('-created_at')

class AddCourseView(APIView):
    permission_classes = [IsAuthenticated, IsRegistrar]

    def post(self, request):
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LecturerlistView(APIView):
    permission_classes = [IsAuthenticated, IsRegistrar] 

    def get(self, request):
        lecturers = CustomUser.objects.filter(role='lecturer')
        serializer = LecturerlistSerializer(lecturers, many=True)
        return Response(serializer.data)


class LecturerIssueListView(generics.ListAPIView):
    serializer_class = IssuesSerializer
    permission_classes = [IsAuthenticated, IsLecturer]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'lecturer':
            return Issues.objects.filter(lecturer=user) 
        return Issues.objects.none()    

class UpdateIssueStatusView(APIView):   
    permission_classes = [IsAuthenticated, IsLecturer]   

    def patch(self, request, pk):   
        user = request.user
        issue = Issues.objects.get(pk=pk)

        if user.role != 'lecturer':
            return Response({"error": "Only lecturers can update issue status"}, status=403)
        if issue.lecturer != user:
            return Response({"error": "You are not assigned to this issue"}, status=403)

        serializer = IssuesSerializer(issue, data=request.data, partial=True)
        if serializer.is_valid():
            updated_issue = serializer.save()
            student_email = updated_issue.student.email
            subject = f"Issue Status Updated: {updated_issue.complaint_type}"
            message = f"Dear {updated_issue.student.username},\n\n" \
                      f"The status of your issue regarding '{updated_issue.complaint_type}' has been updated to '{updated_issue.status}'.\n\n" \
                      f"Thank you,\nAcademic Issue Tracking System"
            send_mail(
                subject=subject,
                message=message,
                from_email='AITS <aitrack.netlify.com>',
                recipient_list=[student_email],
                fail_silently=False,
            )
            return Response({
                "message": "Issue status updated successfully",
                "issue": {
                    "id": updated_issue.id,
                    "status": updated_issue.status,
                    "lecturer": updated_issue.lecturer.username,
                }
            }, status=200)
        return Response(serializer.errors, status=400)
                           
class UserprofileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserprofileSerializer(request.user)
        return Response(serializer.data)
    
    def put(self, request):
        serializer = UserprofileSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetCoursesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        courses = Course.objects.all()
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)

class PendingIssuesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        issues = Issues.objects.filter(status='Pending')
        serializer = IssuesSerializer(issues, many=True)
        return Response(serializer.data)

class AssignedIssuesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        issues = Issues.objects.filter(status='Assigned')
        serializer = IssuesSerializer(issues, many=True)
        return Response(serializer.data)

class ResolvedIssuesView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        issues = Issues.objects.filter(status='Resolved')
        serializer = IssuesSerializer(issues, many=True)
        return Response(serializer.data)