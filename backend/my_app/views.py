from django.shortcuts import render
from rest_framework import viewsets
from .models import CustomUser, Department, Course, Issues
from .serializers import CustomUserSerializer, DepartmentSerializer, CourseSerializer, IssuesSerializer


# Create your views here.
