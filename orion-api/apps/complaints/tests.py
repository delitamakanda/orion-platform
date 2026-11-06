from django.utils import timezone
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from apps.accounts.models import CustomUser
from apps.complaints.models import Complaint


class ComplaintListPaginationTests(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.agent = CustomUser.objects.create_user(
            username='agent', email='agent@example.com', password='pass12345!', role='agent'
        )
        now = timezone.now()
        for i in range(30):
            Complaint.objects.create(
                source_system='test',
                reference=f'REF-{i:03d}',
                original_external_id=str(i),
                title=f'Plainte {i}',
                description='desc',
                category='fraude' if i % 2 else 'vol',
                location='Paris',
                incident_date=now,
                declared_urgency=1,
                received_at=now,
                status=Complaint.Status.ANALYZED if i < 5 else Complaint.Status.IMPORTED,
            )
        cls.url = '/api/v1/complaints/'

    def setUp(self):
        token, _ = Token.objects.get_or_create(user=self.agent)
        self.client.credentials(HTTP_AUTHORIZATION=f'Token {token.key}')

    def get_data(self, **params):
        response = self.client.get(self.url, params)
        return response, response.json().get('data')

    def test_first_page(self):
        response, data = self.get_data(page=1, page_size=10)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['count'], 30)
        self.assertEqual(len(data['results']), 10)
        self.assertIsNotNone(data['next'])
        self.assertIsNone(data['previous'])

    def test_last_page_has_no_next(self):
        _, data = self.get_data(page=3, page_size=10)
        self.assertEqual(len(data['results']), 10)
        self.assertIsNone(data['next'])
        self.assertIsNotNone(data['previous'])

    def test_out_of_range_page_returns_404(self):
        response = self.client.get(self.url, {'page': 4, 'page_size': 10})
        self.assertEqual(response.status_code, 404)

    def test_stable_order_without_duplicates_across_pages(self):
        ids = []
        for page in (1, 2, 3):
            _, data = self.get_data(page=page, page_size=10)
            ids.extend(item['id'] for item in data['results'])
        self.assertEqual(len(ids), len(set(ids)))
        expected = list(
            Complaint.objects.order_by('-created_at', '-id').values_list('id', flat=True)
        )
        self.assertEqual(ids, expected)

    def test_page_size_is_capped(self):
        _, data = self.get_data(page_size=5000)
        # Only 30 rows exist: the cap (1000) must not break the request.
        self.assertEqual(len(data['results']), 30)
        self.assertEqual(data['count'], 30)

    def test_pagination_with_filter(self):
        _, data = self.get_data(status='analyzed', page=1, page_size=2)
        self.assertEqual(data['count'], 5)
        self.assertEqual(len(data['results']), 2)
        self.assertIsNotNone(data['next'])

    def test_pagination_with_reference_filter(self):
        _, data = self.get_data(reference__icontains='REF-00', page_size=5)
        self.assertEqual(data['count'], 10)
        self.assertEqual(len(data['results']), 5)

    def test_unauthenticated_is_rejected(self):
        self.client.credentials()
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 401)
