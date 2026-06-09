from apps.integrations.views import SyncJobListAPIView, SyncComplainsAPIView, LastedSyncJobAPIView
from django.urls import path

urlpatterns = [
    path('sync-jobs/', SyncJobListAPIView.as_view(), name='sync-job-list'),
    path('sync-complains/', SyncComplainsAPIView.as_view(), name='sync-complains'),
    path('latest-sync-job/', LastedSyncJobAPIView.as_view(), name='latest-sync-job'),
]