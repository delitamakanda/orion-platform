from django.contrib import admin
from apps.complaints.models import Complaint

class ComplaintAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'description', 'created_at', 'updated_at')
    search_fields = ('id', 'title', 'description')
    list_filter = ('created_at', 'updated_at')
    date_hierarchy = 'created_at'
    ordering = ('-id',)

admin.site.register(Complaint, ComplaintAdmin)
