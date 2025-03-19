from django.shortcuts import render
from rest_framework import viewsets, status
from .models import CustomUser, Department, Course, Issues
from .serializers import CustomUserSerializer, DepartmentSerializer, CourseSerializer, IssuesSerializer ,RegisterSerializer
from rest_framework.permissions import IsAuthenticated
from.permissions import IslecturerOrRegistrar
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response

class RegisterView(CreateAPIView):
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save
        return Response({"message": "User  registered successfully"}, status=status.HTTP_201_CREATED)

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
    permission_classes = [IsAuthenticated, IslecturerOrRegistrar]