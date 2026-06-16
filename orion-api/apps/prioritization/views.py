from rest_framework.views import APIView
from apps.prioritization.selectors.priority_assessment_selectors import PriorityAssessmentSelectors
from apps.prioritization.services.prioritization_service import PrioritizationService
from apps.complaints.models import Complaint
from apps.prioritization.serializers import CreatePriorityAssessmentSerializer, CreateReviewDecisionSerializer, PriorityAssessmentSerializer
from apps.common.responses import GenericResponse
from rest_framework import status

class CreateAssessmentAPIView(APIView):
    def post(self, request):
        complaint = Complaint.objects.get(id=request.data.get('complaint_id'))
        assessment = PrioritizationService().prioritize(complaint)
        serializer = CreatePriorityAssessmentSerializer(data=assessment)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return GenericResponse(serializer.data, status=status.HTTP_201_CREATED)

class CreateReviewDecisionAPIView(APIView):
    def post(self, request):
        serializer = CreateReviewDecisionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return GenericResponse(serializer.data, status=status.HTTP_201_CREATED)
    

class ListAssessmentsAPIView(APIView):
    def get(self, request):
        assessments = PriorityAssessmentSelectors.list_assessments()
        serializer = PriorityAssessmentSerializer(assessments, many=True)
        return GenericResponse(serializer.data, status=status.HTTP_200_OK)
    

class GetAssessmentByComplaintAPIView(APIView):
    def get(self, request, complaint_id):
        assessment = PriorityAssessmentSelectors.get_by_complaint(complaint_id)
        serializer = PriorityAssessmentSerializer(assessment)
        return GenericResponse(serializer.data, status=status.HTTP_200_OK)