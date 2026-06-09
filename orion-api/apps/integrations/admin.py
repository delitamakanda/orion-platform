from django.contrib import admin
from apps.integrations.models import SyncJob

class SyncJobAdmin(admin.ModelAdmin):
    list_display = ('id', 'created_at', 'updated_at')
    list_filter = ('created_at', 'updated_at')
    ordering = ('-created_at',)

admin.site.register(SyncJob, SyncJobAdmin)
