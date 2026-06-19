from django.contrib import admin
from apps.notifications.models import Notification

class NotificationAdmin(admin.ModelAdmin):
    list_display = ('title', 'recipient', 'type', 'priority', 'is_read', 'created_at')
    list_filter = ('type', 'priority', 'is_read', 'created_at')
    search_fields = ('title', 'message', 'recipient__username')
    readonly_fields = ('created_at', 'updated_at')

admin.site.register(Notification, NotificationAdmin)
