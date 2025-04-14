from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError

class CustomUser(AbstractUser):
    ROLE_CHOICES = [
        ('student', 'Student'),
        ('lecturer', 'Lecturer'),
        ('registrar', 'Registrar'),
    ]

    GENDER_CHOICES = [
        ('male', 'Male'),
        ('female', 'Female'),
    ]
    NUMBER_TYPE_CHOICES = [
        ('student_number', 'Student Number'),
        ('lecturer_number', 'Lecturer Number'),
        ('registrar_number', 'Registrar Number'),
    ]

    YEAR_OF_STUDY_CHOICES = [
        (1, '1st Year'),
        (2, '2nd Year'),
        (3, '3rd Year'),
        (4, '4th Year'),
        (5, '5th Year'),]
    email = models.EmailField(unique=False)
    number_type = models.CharField(max_length=20, choices = NUMBER_TYPE_CHOICES, null=False)
    student_number = models.CharField(max_length=10, unique=True, null = True, blank = False)
    lecturer_number = models.CharField(max_length=10, unique=True, null=True, blank=False)
    registrar_number = models.CharField(max_length=10, unique=True, null=True, blank=False)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, null=True, blank=True)
    year_of_study = models.IntegerField(choices=YEAR_OF_STUDY_CHOICES, null=True, blank=True)
    
    def save(self, *args, **kwargs):
        if self.number_type == 'student_number':
            self.role = 'student'
        elif self.number_type == 'lecturer_number':
            self.role = 'lecturer'
        elif self.number_type == 'registrar_number':
            self.role = 'registrar'
        else:
            self.role = None
        self.clean()      
        super().save(*args, **kwargs)
    
    def clean(self):
        prefix_map = {
            "student_number": "24",
            "lecturer_number": "30",
            "registrar_number": "40",
        }

        number_field = f"{self.number_type}"
        number_value = getattr(self, number_field)

        if number_value:
            expected_prefix = prefix_map.get(self.number_type)
            if not number_value.startswith(expected_prefix):
                raise ValidationError(
                    f"{self.number_type} must start with {expected_prefix}"
                )
        super().clean()

    def save(self, *args, **kwargs):
        self.clean()  
        super().save(*args, **kwargs)
        

    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"


class Course(models.Model):
    course_name = models.CharField(max_length=50, unique=True)
    course_code = models.CharField(max_length=10, unique=True)
    lecturer = models.CharField(max_length=100, unique=False)

    def __str__(self):
        return f"{self.course_name} - {self.course_code}"

class Issues(models.Model):
    ISSUE_CHOICES = [
        ('correction', 'Correction'),
        ('missing marks', 'Missing marks'),
        ('appeal', 'Appeal'),
    ]
    ISSUE_TYPES = [
        ('test', 'Test'),
        ('course work','Course work'),
        ('final exam','Final exam')
    ]

    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('resolved', 'Resolved'),
        ('in progress', 'In progress'),
    ]

    student = models.ForeignKey(
        CustomUser, on_delete=models.SET_NULL, null=True, 
        limit_choices_to={'role': 'student'}, related_name="student_issues"
    )
    complaint = models.CharField(max_length=40, choices=ISSUE_CHOICES)
    complaint_type = models.CharField(max_length=40, choices=ISSUE_TYPES, null=True)
    
    
    course = models.ForeignKey(
        Course, on_delete=models.PROTECT, related_name="course_issues",
        null=True, blank=False
    )
    custom_complaint = models.TextField(null=True)
    status = models.CharField(max_length=100, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    lecturer = models.ForeignKey(
        CustomUser, on_delete=models.PROTECT, 
        limit_choices_to={'role': 'lecturer'}, related_name="lecturer_issues",
        null = True, blank = False
    )
    academic_registrar = models.ForeignKey(
        CustomUser, on_delete=models.PROTECT, 
        limit_choices_to={'role': 'registrar'}, related_name="registrar_issues",
        null = True , blank = False
    )

    def __str__(self):
        return f"{self.issue_type} by {self.student.username} created at {self.created_at}"