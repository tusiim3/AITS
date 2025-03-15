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

class IssuesSerializer(serializers.ModelSerializer):
    student = serializers.CharField(source='student.username', read_only=True)
    lecturer = serializers.CharField(source='lecturer.username', read_only=True)
    academic_registrar = serializers.CharField(source='academic_registrar.username', read_only=True)
    department = serializers.CharField(source='department.department_name', read_only=True)
    course = serializers.CharField(source='course.course_name', read_only=True)

    class Meta:
        model = Issues
        fields = ['id', 'student', 'issue_type', 'department', 'course', 'description', 'status', 'created_at', 'lecturer', 'academic_registrar']



