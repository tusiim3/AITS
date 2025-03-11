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
    role =models.CharField(max_length=20, choices=ROLE_CHOICES, default='student')
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



    



