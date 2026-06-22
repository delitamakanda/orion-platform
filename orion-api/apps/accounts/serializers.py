import random
import string
from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from apps.accounts.models import CustomUser, Profile


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('phone_number', 'address')
        read_only_fields = ('id',)
        extra_kwargs = {
            'phone_number': {'required': False},
            'address': {'required': False},
        }

class CustomUserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True, label='Confirm Password')

    class Meta:
        model = CustomUser
        fields = [
            'id',
            'username',
            'email',
            'first_name',
            'last_name',
            'role',
            'password',
            'password2',
        ]
        read_only_fields = ('id',)
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True},
            'username': {'required': False},
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        validate_password(attrs['password'])
        return attrs
    
    def create(self, validated_data):
        validated_data.pop('password2', None)
        if 'username' not in validated_data or not validated_data['username']:
            validated_data['username'] = self.generate_random_username(validated_data['email'])
        user = CustomUser.objects.create_user(**validated_data)
        return user
    
    def update(self, instance, validated_data):
        validated_data.pop('password2', None)
        password = validated_data.pop('password', None)
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        if password:
            instance.set_password(password)
        instance.save()
        return instance
    
    def generate_random_username(self, email):
        base_username = email.split('@')[0]
        random_suffix = ''.join(random.choices(string.ascii_lowercase + string.digits, k=6))
        return f"{base_username}_{random_suffix}"

class CustomUserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)
    class Meta:
        model = CustomUser
        fields = (
            'id',
            'username',
            'email',
            'first_name',
            'last_name',
            'is_staff',
            'is_active',
            'role',
            'profile',
            'date_joined',
        )
        read_only_fields = ('id', 'is_staff', 'is_active', 'date_joined', 'profile')
