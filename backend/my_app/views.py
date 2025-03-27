from django.shortcuts import render
from rest_framework import viewsets, status
from .models import CustomUser, Department, Course, Issues
from .serializers import CustomUserSerializer, DepartmentSerializer, CourseSerializer, IssuesSerializer ,RegisterSerializer
from .permissions import IsOwnerOrIslecturerOrRegistrar
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response

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
                        "gender": user.gender,
                        "year_of_study": user.year_of_study,
                        "student_number": user.student_number
                    }
                },
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated]

class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer     
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