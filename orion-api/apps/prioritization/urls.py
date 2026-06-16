from django.urls import path
from apps.prioritization.views import( CreateAssessmentAPIView, CreateReviewDecisionAPIView,
ListAssessmentsAPIView, GetAssessmentByComplaintAPIView)

app_name = 'prioritization'

urlpatterns = [
    path('assessments/', CreateAssessmentAPIView.as_view(), name='create-assessment'),
    path('reviews/', CreateReviewDecisionAPIView.as_view(), name='create-review-decision'),
    path('assessments/list/', ListAssessmentsAPIView.as_view(), name='list-assessments'),
    path('assessments/<str:complaint_id>/', GetAssessmentByComplaintAPIView.as_view(), name='get-assessment-by-complaint'),
]