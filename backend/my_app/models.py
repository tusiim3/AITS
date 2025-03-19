from django.db import models
from django.contrib.auth.models import AbstractUser

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

    YEAR_OF_STUDY_CHOICES = [
        (1, '1st Year'),
        (2, '2nd Year'),
        (3, '3rd Year'),
        (4, '4th Year'),
        (5, '5th Year'),
    ]
    student_number = models.CharField(max_length=10, unique=True, null = False, blank = False )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='student')
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, default='male')
    year_of_study = models.IntegerField(choices=YEAR_OF_STUDY_CHOICES, default=1)

    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"

class Department(models.Model):
    department_name = models.CharField(max_length=50, unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.department_name

class Course(models.Model):
    course_name = models.CharField(max_length=50, unique=True)
    course_code = models.CharField(max_length=10, unique=True)

    def __str__(self):
        return f"{self.course_name} - {self.course_code}"

class Issues(models.Model):
    ISSUE_CHOICES = [
        ('correction', 'Correction'),
        ('missing marks', 'Missing marks'),
        ('appeal', 'Appeal'),
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
    issue_type = models.CharField(max_length=40, choices=ISSUE_CHOICES)
    department = models.ForeignKey(
        Department, on_delete=models.PROTECT, related_name="department_issues",
        null=True, blank=False
    )
    course = models.ForeignKey(
        Course, on_delete=models.PROTECT, related_name="course_issues",
        null=True, blank=False
    )
    description = models.TextField()
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