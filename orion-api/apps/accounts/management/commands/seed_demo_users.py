import logging
import os

from django.conf import settings
from django.core.management.base import BaseCommand

from apps.accounts.models import CustomUser

logger = logging.getLogger(__name__)

DEMO_PASSWORD = 'orion-demo-123'
DEMO_USERS = (
    ('agent', 'agent@orion.local'),
    ('magistrat', 'magistrat@orion.local'),
    ('procureur', 'procureur@orion.local'),
    ('administrateur', 'admin@orion.local'),
)


class Command(BaseCommand):
    help = (
        'Creates one demo account per role (idempotent). Only runs when '
        'DEBUG=True or SEED_DEMO_USERS=1.'
    )

    def handle(self, *args, **options):
        if not (settings.DEBUG or os.getenv('SEED_DEMO_USERS') == '1'):
            self.stdout.write('Demo users skipped (DEBUG is off and SEED_DEMO_USERS is not 1).')
            return

        for role, email in DEMO_USERS:
            if CustomUser.objects.filter(email=email).exists():
                continue
            user = CustomUser(
                email=email,
                username=email,
                first_name='Démo',
                last_name=role.capitalize(),
                role=role,
            )
            user.set_password(DEMO_PASSWORD)
            user.save()
            logger.info('Demo user created: %s (%s)', email, role)
            self.stdout.write(f'Created demo user {email} ({role})')
