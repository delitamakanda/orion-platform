from apps.accounts.views import LoginView, RegisterUserView, LogoutView, UserDetailView
from django.urls import path

app_name = 'accounts'

urlpatterns = [
    path('register/', RegisterUserView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('me/', UserDetailView.as_view(), name='user-detail'),
]