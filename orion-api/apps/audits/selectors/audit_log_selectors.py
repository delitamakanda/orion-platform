from apps.audits.models import Audit

class AuditLogSelectors:
    @staticmethod
    def get_latest_audit_log():
        return Audit.objects.order_by('-timestamp').first() or None

    @staticmethod
    def get_audit_logs_by_user(username):
        return Audit.objects.filter(user__username=username).order_by('-timestamp') or None
