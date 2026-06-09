from django.urls import path
from apps.prioritization.views import CreateAssessmentAPIView, CreateReviewDecisionAPIView

app_name = 'prioritization'

urlpatterns = [
    path('assessments/', CreateAssessmentAPIView.as_view(), name='create-assessment'),
    path('reviews/', CreateReviewDecisionAPIView.as_view(), name='create-review-decision'),
]