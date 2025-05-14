from django.contrib import admin
from .models import CustomUser, Course, Issues

admin.site.register(CustomUser)
'''admin.site.register(Department)'''
admin.site.register(Course)
admin.site.register(Issues)
