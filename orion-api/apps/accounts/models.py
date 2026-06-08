from django.db import models
from django.contrib.auth.models import AbstractUser

"""
RBAC models for accounts app
agent publique
magistrat
procureur
administrateur
"""

class CustomUser(AbstractUser):
    rbac_roles = (
        ('agent', 'Agent'),
        ('magistrat', 'Magistrat'),
        ('procureur', 'Procureur'),
        ('administrateur', 'Administrateur'),
    )
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=50, choices=rbac_roles, default='agent')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name', 'role'  ]

    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name='groups',
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        related_name='customuser_set',  # Avoid clashes with the default User model
        related_query_name='customuser',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name='user permissions',
        help_text='Specific permissions for this user.',
        related_name='customuser_set',
        related_query_name='customuser',
    )

    def __str__(self):
        return f'User: {self.email}, Role: {self.role}'
    
    class Meta:
        ordering = ['-id']

class Profile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='profile')
    phone_number = models.CharField(max_length=20, null=True, blank=True)
    address = models.CharField(max_length=200, null=True, blank=True)
    class Meta:
        verbose_name = 'Profile'
        verbose_name_plural = 'Profiles'
        db_table = 'accounts_profile'
        ordering = ['-id']
    def __str__(self):
        return f'Profile: {self.user.email}, Phone Number: {self.phone_number}'


