from django.urls import path, include
from rest_framework.routers import DefaultRouter
from my_app.views import CustomUserViewSet, DepartmentViewSet, CourseViewSet, IssuesViewSet
from rest_framework_simplejwt.views import TokenObtainPairView

# Create the router
router = DefaultRouter()
router.register(r'users', CustomUserViewSet)
router.register(r'departments', DepartmentViewSet)
router.register(r'courses', CourseViewSet)
router.register(r'issues', IssuesViewSet)

urlpatterns = [
    # API paths
    path('api/', include(router.urls)),  # Fixed missing comma and added '/' at the end of 'api'
    
    # Token paths for JWT authentication
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenObtainPairView.as_view(), name='token_refresh_pair'),
]
