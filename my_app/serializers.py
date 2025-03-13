from rest_framework import serializers
from .models import CustomUser, Department, Course, Issues

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'role', 'gender', 'year_of_study']



