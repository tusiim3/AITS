from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets, status, generics
from .models import CustomUser, Course, Issues
from .serializers import CustomUserSerializer, CourseSerializer, IssuesSerializer ,RegisterSerializer, LoginSerializer, LogoutSerializer, CreateIssue
from .permissions import IsOwnerOrIslecturerOrRegistrar,IsIssueOwner,IsRegistrar,IsLecturer,IsStudent
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken



class RegisterView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            number_type = serializer.validated_data.get("number_type")

            role_mapping = {
                'student_number': 'student',
                'lecturer_number': 'lecturer',
                'registrar_number': 'registrar'
            }
            serializer.validated_data['role'] = role_mapping.get("number_type")
            
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
        lecturer_username = request.data.get("lecturer_username")  
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