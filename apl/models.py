from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    ROLE_CHOICES = [
        ('student', 'Student'),
        ('lecturer', 'Lecturer'),
        ('academic_registrar', 'Academic Registrar'),
    ]
    
    role = models.CharField(max_length=30, choices=ROLE_CHOICES, default='student')
    year_of_study = models.IntegerField(null=True, blank=True)

    def __str__(self):  
        return f"{self.username} ({self.get_role_display()})"


class Department(models.Model):
    department_name = models.CharField(max_length=50, unique=True)  
    description = models.TextField(blank=True)

    def __str__(self):  
        return self.department_name


class Issue(models.Model):
    ISSUE_CHOICES = [
        ('correction', 'Correction'),
        ('missing_marks', 'Missing Marks'),
        ('appeal', 'Appeal'),
    ]
    
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('resolved', 'Resolved'),
        ('in_progress', 'In Progress'),
    ]
    
    student = models.ForeignKey(
        CustomUser, on_delete=models.SET_NULL, null=True, 
        limit_choices_to={'role': 'student'}, related_name="student_issues"
    )
    issue_type = models.CharField(max_length=40, choices=ISSUE_CHOICES)
    department = models.ForeignKey(
        Department, on_delete=models.PROTECT, related_name="department_issues"
    )
    course_unit_code = models.CharField(max_length=10)  
    course_unit_name = models.CharField(max_length=100)
    description = models.TextField()
    
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    
    lecturer = models.ForeignKey(
        CustomUser, on_delete=models.PROTECT, 
        limit_choices_to={'role': 'lecturer'}, related_name="lecturer_issues"
    )
    academic_registrar = models.ForeignKey(
        CustomUser, on_delete=models.PROTECT, 
        limit_choices_to={'role': 'academic_registrar'}, related_name="registrar_issues"
    )

    def __str__(self):  
        return f"{self.issue_type} by {self.student.username if self.student else 'Unknown'} at {self.created_at.strftime('%Y-%m-%d %H:%M:%S')}"
