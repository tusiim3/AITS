from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    RegisterView, LoginView, LogoutView, CustomUserViewSet, CourseViewSet, IssuesViewSet,
    CreateIssueView, RegistrarIssueListView, AssignIssueView, StudentIssueHistoryView,
    AddCourseView, LecturerlistView, LecturerIssueListView, UpdateIssueStatusView,
    UserprofileView, CoursesListView, PendingIssuesView, AssignedIssuesView, ResolvedIssuesView,
)

router = DefaultRouter()
'''router.register(r'users', CustomUserViewSet, basename='user')
router.register(r'courses', CourseViewSet, basename='course')
router.register(r'issues', IssuesViewSet, basename='issue')'''

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('', include(router.urls)),
    path('issues/create/', CreateIssueView.as_view(), name='create-issue'),
    path('issues/registrar-pending/', RegistrarIssueListView.as_view(), name='registrar-pending-issues'),
    path('issues/assign/<int:pk>/', AssignIssueView.as_view(), name='assign-issue'),
    path('issues/student-history/', StudentIssueHistoryView.as_view(), name='student-issue-history'),
    path('issues/lecturer-list/', LecturerlistView.as_view(), name='lecturer-list'),
    path('issues/lecturer-issues/', LecturerIssueListView.as_view(), name='lecturer-issues'),
    path('issues/update-status/<int:pk>/', UpdateIssueStatusView.as_view(), name='update-issue-status'),
    path('courses/add/', AddCourseView.as_view(), name='add-course'),
    path('courses/list/', CoursesListView.as_view(), name='courses-list'),
    path('profile/', UserprofileView.as_view(), name='user-profile'),
    path('issues/pending/', PendingIssuesView.as_view(), name='pending-issues'),
    path('issues/assigned/', AssignedIssuesView.as_view(), name='assigned-issues'),
    path('issues/resolved/', ResolvedIssuesView.as_view(), name='resolved-issues'),
]
