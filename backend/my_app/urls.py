from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CustomUserViewSet, DepartmentViewSet, CourseViewSet, IssuesViewSet, RegisterView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# Create a router for viewsets
router = DefaultRouter()
router.register(r'users', CustomUserViewSet)
router.register(r'departments', DepartmentViewSet)
router.register(r'courses', CourseViewSet)
router.register(r'issues', IssuesViewSet)

# Define app-specific URLs
urlpatterns = [
    path('', include(router.urls)),  # Include all viewset routes
    path('register/', RegisterView.as_view(), name='register'),  # Registration endpoint
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # JWT token endpoint
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # JWT refresh endpoint
]