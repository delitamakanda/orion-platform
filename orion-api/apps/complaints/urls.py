from rest_framework import routers
from apps.complaints.views import ComplaintViewSet

router = routers.DefaultRouter()

router.register(r'', ComplaintViewSet)

urlpatterns = router.urls
