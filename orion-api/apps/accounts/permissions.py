from rest_framework.permissions import BasePermission
from apps.accounts.models import CustomUser

class IsAgentOrHigher(BasePermission):
    """
    Custom permission to only allow users with role 'agent' or higher.
    """
    def has_permission(self, request, view):
        user = request.user
        if isinstance(user, CustomUser):
            return user.is_agent() or user.is_magistrat() or user.is_procureur() or user.is_administrateur()
        return False
    

class IsMagistratOrHigher(BasePermission):
    """
    Custom permission to only allow users with role 'magistrat' or higher.
    """
    def has_permission(self, request, view):
        user = request.user
        if isinstance(user, CustomUser):
            return user.is_magistrat() or user.is_procureur() or user.is_administrateur()
        return False


class IsProcureurOrHigher(BasePermission):
    """
    Custom permission to only allow users with role 'procureur' or higher.
    """
    def has_permission(self, request, view):
        user = request.user
        if isinstance(user, CustomUser):
            return user.is_procureur() or user.is_administrateur()
        return False

class IsAdministrateur(BasePermission):
    """
    Custom permission to only allow users with role 'administrateur'.
    """
    def has_permission(self, request, view):
        user = request.user
        if isinstance(user, CustomUser):
            return user.is_administrateur()
        return False