from django.core.management.base import BaseCommand, CommandError
from apps.integrations.tasks import run_sync_jobs


class Command(BaseCommand):
    help = 'Syncs all integrations'

    def handle(self, *args, **options):
        try:
            run_sync_jobs()
        except Exception as e:
            raise CommandError(f'Error syncing integrations: {str(e)}')