from django.contrib import admin
from .models import CustomUser, Department

admin.site.register(CustomUser)
admin.site.register(Department)

# Register your models here.
