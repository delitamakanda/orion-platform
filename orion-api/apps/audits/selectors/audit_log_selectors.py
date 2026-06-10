from apps.audits.models import Audit

class AuditLogSelectors:
    @staticmethod
    def get_latest_audit_log():
        return Audit.objects.order_by('-timestamp').first()

    @staticmethod
    def get_audit_logs_by_user(user_id):
        return Audit.objects.filter(user_id=user_id).order_by('-timestamp')
    
    @staticmethod
    def list_audit_logs():
        return Audit.objects.all().order_by('-timestamp')