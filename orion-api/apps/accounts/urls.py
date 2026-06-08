from apps.accounts.views import RegisterUserView
from django.urls import path

app_name = 'accounts'

urlpatterns = [
    path('register/', RegisterUserView.as_view(), name='register'),
]