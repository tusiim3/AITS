from rest_framework.permissions import BasePermission

class IslecturerOrRegistrar(BasePermission):
    def has_permission(self, request, view):
        return request.user.role in ['lecturer','registrar']