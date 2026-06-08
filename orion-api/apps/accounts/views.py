from apps.accounts.models import CustomUser
from apps.accounts.serializers import CustomUserSerializer, CustomUserRegistrationSerializer
from django.contrib.auth import authenticate, logout
from rest_framework import generics, permissions, status, views
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

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
