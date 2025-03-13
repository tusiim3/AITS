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

class IssuesSerializers(serializers.ModelSerializer):
    student = CustomUserSerializer(read_only=True)
    lecturer = CustomUserSerializer(read_only=True)
    academic_registrar = CustomUserSerializer(read_only=True)
    Department = DepartmentSerializer(read_only=True)
    course = CourseSerializer(read_only=True)

    class Meta:
        model = Issues
        fields = ['id', 'student', 'Issue_type', 'department', 'course', 'description', 'status', 'created_at', 'lecturer', 'academic_registrar']



