from django.contrib import admin
from apps.audits.models import Audit

class AuditAdmin(admin.ModelAdmin):
    list_display = ('user', 'action', 'target_type', 'target_id', 'timestamp', 'ip_address')
    list_filter = ('action', 'target_type', 'timestamp')
    search_fields = ('user__username', 'target_id', 'metadata')

admin.site.register(Audit, AuditAdmin)


