from rest_framework.permissions import BasePermission

class IsOwnerOrIslecturerOrRegistrar(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user.role in ['lecturer','registrar']:
            return True
        if request.user.role == 'student':
            return obj.student == request.user
        return False
    
class IsStudent(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'student' 

class IsLecturer(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'lecturer'

class IsRegistrar(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'registrar'
    
class IsIssueOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.student == request.user