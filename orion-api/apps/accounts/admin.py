from django.contrib import admin
from apps.accounts.models import CustomUser, Profile

class ProfileInline(admin.StackedInline):
    model = Profile
    can_delete = False

class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('email', 'first_name', 'last_name', 'is_staff', 'is_active', 'role')
    search_fields = ('email', 'first_name', 'last_name')
    list_filter = ('is_staff', 'is_active', 'role')
    inlines = [ProfileInline]
    ordering = ('-id',)

admin.site.register(CustomUser, CustomUserAdmin)
