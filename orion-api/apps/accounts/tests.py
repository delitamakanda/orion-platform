from unittest import mock

from django.core.management import call_command
from django.test import TestCase, override_settings

from apps.accounts.models import CustomUser


@override_settings(DEBUG=True)
class SeedDemoUsersTests(TestCase):
    def test_creates_one_user_per_role(self):
        call_command('seed_demo_users')
        roles = set(CustomUser.objects.values_list('role', flat=True))
        self.assertEqual(roles, {'agent', 'magistrat', 'procureur', 'administrateur'})
        self.assertEqual(CustomUser.objects.count(), 4)

    def test_idempotent_and_keeps_changed_password(self):
        call_command('seed_demo_users')
        user = CustomUser.objects.get(email='agent@orion.local')
        user.set_password('changed')
        user.save()
        call_command('seed_demo_users')
        self.assertEqual(CustomUser.objects.count(), 4)
        user.refresh_from_db()
        self.assertTrue(user.check_password('changed'))

    def test_demo_password_is_valid(self):
        call_command('seed_demo_users')
        user = CustomUser.objects.get(email='magistrat@orion.local')
        self.assertTrue(user.check_password('orion-demo-123'))


@override_settings(DEBUG=False)
class SeedDemoUsersDisabledTests(TestCase):
    def test_skipped_without_debug_or_flag(self):
        with mock.patch.dict('os.environ', {}, clear=False):
            call_command('seed_demo_users')
        self.assertEqual(CustomUser.objects.count(), 0)

    def test_enabled_by_env_flag(self):
        with mock.patch.dict('os.environ', {'SEED_DEMO_USERS': '1'}):
            call_command('seed_demo_users')
        self.assertEqual(CustomUser.objects.count(), 4)
