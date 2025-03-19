from rest_framework import serializers
from .models import CustomUser, Department, Course, Issues
from django.contrib.auth.password_validation import validate_password


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password2 = serializers.Charfield(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'student_number', 'role', 'gender', 'year_of_study', 'password', 'password2']
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({"password": "Passwords do not match"})
        return data
    
        
class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'student_number', 'email', 'role', 'gender', 'year_of_study']

class DepartmentSerializer(serializers.ModelSerializer): 
    class Meta:
        model = Department
        fields = ['id', 'department_name', 'description']

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'course_name', 'course_code']

class IssuesSerializer(serializers.ModelSerializer):
    student = CustomUserSerializer(read_only=True)  
    lecturer = CustomUserSerializer(read_only=True)  
    academic_registrar = CustomUserSerializer(read_only=True) 
    department = DepartmentSerializer(read_only=True)
    course = CourseSerializer(read_only=True)  
    class Meta:
        model = Issues
        fields = ['id', 'student','issue_type', 'department', 'course', 'description', 'status', 'created_at', 'lecturer', 'academic_registrar']


    

