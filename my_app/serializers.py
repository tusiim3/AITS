from rest_framework import serializers
from .models import CustomUser, Department, Course, Issues

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'role', 'gender', 'year_of_study']

class DepartmentSerializer(serializers.ModelSerializer): 
    class Meta:
        model = Department
        fields = ['id', 'department_name', 'description']

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'course_name', 'course_code']




