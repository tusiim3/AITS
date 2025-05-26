from rest_framework import serializers
from my_app.models import CustomUser, Course, Issues
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate
from django.core.mail import send_mail


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True) 
    password2 = serializers.CharField(write_only=True)
    student_number = serializers.CharField(required=False, allow_blank=True)
    lecturer_number = serializers.CharField(required=False, allow_blank=True)
    registrar_number = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'number_type', 'student_number','lecturer_number','registrar_number', 'role', 'year_of_study', 'password', 'password2']
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

        
        for field in ['student_number','lecturer_number', 'registrar_number']:
            if field != required_field:
                data.pop(field, None)
        return data
    

    def create(self, validated_data):
        validated_data.pop('password2')  

        number_type = validated_data['number_type']

        role_mapping = {
            'student_number': 'student',
            'lecturer_number': 'lecturer',
            'registrar_number': 'registrar'
    }

        role = role_mapping.get(number_type)

        if not role:
            raise serializers.ValidationError("Invalid number type provided.")
    
        validated_data['role'] = role
        user = CustomUser.objects.create_user(**validated_data)
        send_mail(
            'Welcome to AITS!',
            f"Hello {user.username},\n\nThank you for registering with AITS. Your account has been created successfully.\n\nBest regards,\nAITS Team",
            from_email='AITS <aitrack.netlify.com>',  
            recipient_list=[user.email],
            fail_silently=False,
        )
        return user


class LoginSerializer(serializers.Serializer):
    
    number_type = serializers.ChoiceField(
        choices=[
            ("student_number", "student Number"),
            ("lecturer_number","lecturer Number"),
            ("registrar_number", "registrar Number"),
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
        try:
            user = CustomUser.objects.get(**{number_type: number})
        except CustomUser.DoesNotExist:
            raise serializers.ValidationError("Invalid credentials")
        
        if not user.check_password(password):
            raise serializers.ValidationError("Invalid credentials")

        data["user"] = user
        return data
       

class LogoutSerializer(serializers.Serializer):
    refresh_token = serializers.CharField()

    def Validate(self, value):
        if not value:
            raise serializers.ValidationError("refresh token is required")
        return value


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'number_type', 'student_number', 'email', 'role','year_of_study']

    def validate(self, data):
        role = data.get('role')

        if role != "student":
            data.pop("year_of_study", None)

        return data


class CourseSerializer(serializers.ModelSerializer):
    lecturer = serializers.CharField()  

    class Meta:
        model = Course
        fields = ['course_name', 'course_code', 'lecturer']

    def create(self, validated_data):
        lecturer_name = validated_data.pop('lecturer') 
        try:
            lecturer = CustomUser.objects.get(username=lecturer_name)
        except CustomUser.DoesNotExist:
            raise serializers.ValidationError(f"Lecturer with name {lecturer_name} does not exist.")
        course = Course.objects.create(lecturer=lecturer, **validated_data)
        return course


class IssuesSerializer(serializers.ModelSerializer):
    student = CustomUserSerializer(read_only=True)  
    lecturer = CustomUserSerializer(read_only=True)  
    academic_registrar = CustomUserSerializer(read_only=True) 
    course = CourseSerializer(read_only=True)  
    lecturer_id = serializers.IntegerField(write_only=True, required=False)

    class Meta:
        model = Issues
        fields = ['id', 'student','complaint_type','complaint', 'course', 'custom_complaint', 'status', 'created_at', 'lecturer', 'academic_registrar', 'lecturer_id']

    def update(self, instance, validated_data):
        request = self.context['request']
        if request.user.role != 'registrar':
            raise serializers.ValidationError("Only registrars can assign Lecturers")

        lecturer_id = validated_data.pop('lecturer_id', None)
        if lecturer_id:
            try:
                lecturer = CustomUser.objects.get(id=lecturer_id, role='lecturer')
                instance.lecturer = lecturer
            except CustomUser.DoesNotExist:
                raise serializers.ValidationError({"lecturer_id": "Invalid lecturer ID"})
        return super().update(instance, validated_data)                


class CreateIssue(serializers.ModelSerializer):
    course = serializers.CharField(max_length = 10)
    complaint = serializers.CharField(max_length = 20)
    complaint_type = serializers.CharField(max_length=20)
    custom_complaint = serializers.CharField(max_length = 500)
    
    class Meta:
        model = Issues
        fields = ['course', 'complaint', 'complaint_type', 'custom_complaint']
     
    def create(self, validated_data):
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
        if not issue_type:
            raise serializers.ValidationError({"complaint":"invalid complaint type"})
        issue = Issues.objects.create(
            course=course,
            complaint=issue_type,
            complaint_type=validated_data['complaint_type'],
            custom_complaint=validated_data['custom_complaint'],
            student=self.context['request'].user, 
            status='pending'
        )
        send_mail(
            subject='New Issue Created',
            message=f'An issue has been created with the following details:\n\nCourse: {course.course_name}\nComplaint Type: {issue_type}\nCustom Complaint: {validated_data["custom_complaint"]}',
            from_email='AITS <aitrack.netlify.com>',
            recipient_list=[self.context['request'].user.email],
            fail_silently=False,    
        )
        return issue

class LecturerlistSerializer(serializers.ModelSerializer):
    courses = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'lecturer_number', 'courses']

    def get_courses(self, obj):
        courses = Course.objects.filter(lecturer=obj) 
        return [course.course_name for course in courses]

class AssignIssueSerializer(serializers.Serializer):
    lecturer_username = serializers.CharField(max_length=150)

class IssueStatusUpdateSerializer(serializers.ModelSerializer):   
    class Meta:
        model = Issues
        fields = ['status'] 

class UserprofileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'contact', 'profile_picture', 'number_type', 'student_number', 'lecturer_number', 'registrar_number', 'role', 'year_of_study']
        