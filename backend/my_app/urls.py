from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CustomUserViewSet, DepartmentViewSet, CourseViewSet, IssuesViewSet, RegisterView, LoginView, LogoutView,CreateIssueView, RegistrarIssueListView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

"""
router = DefaultRouter()
router.register(r'users', CustomUserViewSet)
router.register(r'departments', DepartmentViewSet)
router.register(r'courses', CourseViewSet)
router.register(r'issues', IssuesViewSet)
"""

urlpatterns = [
    #path('', include(router.urls)),  
    path('register/', RegisterView.as_view(), name='register'),  
    path('login/', LoginView.as_view(), name='login'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('Logout/', LogoutView.as_view(), name='Logout'), 
    path('issues/', CreateIssueView.as_view(), name='create-issue'),
    path('registrar/issues/', RegistrarIssueListView.as_view(), name='registrar-issue-list'),
]