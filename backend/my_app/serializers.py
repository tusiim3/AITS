from rest_framework import serializers
from my_app.models import CustomUser, Department, Course, Issues
from django.contrib.auth.password_validation import validate_password

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
            raise serializers.ValidationError({"number_":"invalid number type"})
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


    

