from rest_framework import serializers
from my_app.models import CustomUser, Department, Course, Issues
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)
    student_number = serializers.CharField(required=False, allow_blank=True)
    lecturer_number = serializers.CharField(required=False, allow_blank=True)
    registrar_number = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'number_type', 'student_number','lecturer_number','registrar_number', 'role', 'gender', 'year_of_study', 'password', 'password2']
        extra_kwargs = {'password': {'write_only': True},
                        'number_type': {'required':True}}

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({"password": "Passwords do not match"})
    
        number_type = data.get("number_type")
        number_field_map = {
            'student_number': 'student_number',
            'lecturer_number':'lecturer_number',
            'registrar_number':'registrar_number'
        }

        if number_type not in number_field_map:
            raise serializers.ValidationError({"number_type":"invalid number type"})
        required_field = number_field_map[number_type]
        number_value = data.get(required_field)

        if not number_value:
            raise serializers.ValidationError({
                required_field: f"this field is required for {number_type}"
            })

        #checking uniqueness
        if CustomUser.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError({"email":"email already exists"})

        if CustomUser.objects.filter(**{required_field: number_value}).exists():
            raise serializers.ValidationError({
                required_field: "This number is already registered"
            })
        
        prefix_map = {
            "student_number": "24",
            "lecturer_number": "30",
            "registrar_number": "40",
        }

        expected_prefix = prefix_map[number_type]
        if not number_value.startswith(expected_prefix):
            raise serializers.ValidationError({
                required_field: f"Must start with '{expected_prefix}'"
        })

        #remove unused number fields
        for field in ['student_number','lecturer_number', 'registrar_number']:
            if field != required_field:
                data.pop(field, None) # this prevents saving other numbers
        return data
    

    def create(self, validated_data):
        validated_data.pop('password2')
        number_type = validated_data['number_type']
        username = validated_data[number_type]
        validated_data['username'] = username
        user = CustomUser.objects.create_user(**validated_data)
        return user

class LoginSerializer(serializers.Serializer):
    
    number_type = serializers.ChoiceField(
        choices=[
            ("student_number", "student"),
            ("lecturer_number","lecturer"),
            ("registrar_number", "registrar"),
        ],
        required=True
    )

    password = serializers.CharField(write_only=True, required=True)

    def validate(self, data):
        number_type = data.get("number_type")
        password = data.get("password")

        number = self.initial_data.get(number_type)

        if not number:
            raise serializers.ValidationError({number_type: "this field is required."})
        
        user = authenticate(username=number, password = password)

        if not user:
            raise serializers.ValidationError("invalid credentials")
        
        data["user"] = user
        return data

class LogoutSerializer(serializers.Serializer):
    refresh_token = serializers.CharField()

    def Validate(self, data):
        if not value:
            raise serializers.ValidationError("refresh token is required")
        return value


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


class CreateIssue(serializers.Serializer):
    course = serializers.CharField(max_length = 10)
    complaint = serializers.CharField(max_length = 20)
    complaint_type = serializers.CharField(max_length=20)
    custom_complaint = serializers.CharField(max_length = 500)

    def create(self, validated_data):
        #map the input fields to model fields
        course_code = validated_data['course']

        try:
            course = Course.objects.get(course_code=course_code)
        except Course.DoesNotExist:
            raise serializers.ValidationError({"course":"course not found"})
        
        complaint_map = {
            'missing marks': 'missing marks',
            'correction': 'correction',
            'appeal': 'appeal'
        }

        issue_type = complaint_map.get(validated_data['complaint'])

        issue = Issues.objects.create(
            course=course,
            complaint=issue_type,
            complaint_type=validated_data['complaint_type'],
            custom_complaint=validated_data['custom_complaint'],
            student=self.context['request'].user,
            status='pending'
        )
        return issue

