from apps.audits.models import Audit

class AuditLogService:
    @staticmethod
    def record(
        *,
        user=None,
        action: str,
        target_id: str = "",
        target_type: str,
        metadata: dict = None,
        request=None,        
    ):
        return Audit.objects.create(
            user=user,
            action=action,
            target_id=target_id,
            target_type=target_type,
            metadata=metadata or {},
            ip_address=request.META.get('REMOTE_ADDR') if request else None,
            user_agent=request.META.get('HTTP_USER_AGENT') if request else "",
        )