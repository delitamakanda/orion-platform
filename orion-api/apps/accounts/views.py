from apps.accounts.models import CustomUser
from apps.accounts.serializers import CustomUserSerializer, CustomUserRegistrationSerializer
from django.contrib.auth import authenticate, logout
from rest_framework import generics, permissions, status, views
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from apps.accounts.permissions import IsAdministrateur
from rest_framework.viewsets import ModelViewSet
from apps.audits.services.audit_log_service import AuditLogService

class RegisterUserView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserRegistrationSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        try:
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'user': CustomUserSerializer(user).data,
                'token': token.key
            }, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'user': CustomUserSerializer(user).data, 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class LoginView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        if email is None or password is None:
            return Response({'error': 'Please provide both email and password'}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(request, email=email, password=password)
        if user is None:
            return Response({'error': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)

        token, created = Token.objects.get_or_create(user=user)
        AuditLogService.record(
            user=user,
            action='USER_LOGGED_IN',
            target_type='CustomUser',
            metadata={'email': user.email},
            request=request
        )
        return Response({'user': CustomUserSerializer(user).data, 'token': token.key}, status=status.HTTP_200_OK)
    

class LogoutView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        AuditLogService.record(
            user=request.user,
            action='USER_LOGGED_OUT',
            target_type='CustomUser',
            metadata={'email': request.user.email},
            request=request
        )
        logout(request)
        return Response(status=status.HTTP_200_OK)


class UserDetailView(generics.RetrieveAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'email'

    def get_object(self):
        return self.request.user
    
    def update(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    

class UserAdminViewSet(ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            if not IsAdministrateur().has_permission(self.request, self):
                self.permission_denied(self.request, message="You do not have permission to perform this action.")
        return super().get_permissions()

