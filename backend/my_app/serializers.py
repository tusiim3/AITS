from rest_framework import serializers
from my_app.models import CustomUser, Department, Course, Issues
from django.contrib.auth.password_validation import validate_password

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'number_type', 'student_number', 'role', 'gender', 'year_of_study', 'password', 'password2']
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({"password": "Passwords do not match"})
        prefix_map = {
            "student_number": "24",
            "lecturer_number": "30",
            "registrar_number": "40",
        }

        number_type = data.get("number_type")
        number_field = number_type
        number_value = data.get(number_field)

        if number_value:
            expected_prefix = prefix_map.get(number_type)
            if not number_value.startswith(expected_prefix):
                raise serializers.ValidationError(
                    {number_type: f"{number_type.replace('_', ' ').title()} must start with '{expected_prefix}'"}
                )

        return data
    
    def create(self, validated_data):
        validated_data.pop('password2')
        user = CustomUser.objects.create_user(**validated_data)
        return user

class LoginSerializer(serializers.Serializer):
    number_type = serializers.ChoiceField(choices=CustomUser.NUMBER_TYPE_CHOICES)
    number = serializers.CharField(max_length=10)
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        number_type = data.get('number_type')
        number_value = data.get("number")
        password = data.get("password")

        user = CustomUser.objects.filter(**{number_type: number_value}).first()

        if not user:
            raise serializers.ValidationError("Invalid credentials")

        if not user.check_password(password):
            raise serializers.ValidationError("Invalid credentials")
        
        data["user"] = user
        return data
        
class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'number_type', 'student_number', 'email', 'role', 'gender', 'year_of_study']

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


    

