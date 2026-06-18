from rest_framework.views import APIView
from apps.prioritization.selectors.priority_assessment_selectors import PriorityAssessmentSelectors
from apps.prioritization.services.prioritization_service import PrioritizationService
from apps.complaints.models import Complaint
from apps.prioritization.serializers import CreatePriorityAssessmentSerializer, CreateReviewDecisionSerializer, PriorityAssessmentSerializer
from apps.common.responses import GenericResponse
from rest_framework import status
from apps.accounts.permissions import IsMagistratOrHigher
from apps.audits.services.audit_log_service import AuditLogService

class CreateAssessmentAPIView(APIView):
    permission_classes = [IsMagistratOrHigher]
    def post(self, request):
        complaint = Complaint.objects.get(id=request.data.get('complaint_id'))
        assessment = PrioritizationService().prioritize(complaint)
        serializer = CreatePriorityAssessmentSerializer(data=assessment)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        AuditLogService.record(
            user=request.user,
            action='PRIORITY_ASSESSED',
            target_id=str(serializer.instance.id),
            target_type='PriorityAssessment',
            metadata={'complaint_id': str(complaint.id)},
            request=request
        )
        return GenericResponse(serializer.data, status=status.HTTP_201_CREATED)

class CreateReviewDecisionAPIView(APIView):
    permission_classes = [IsMagistratOrHigher]
    def post(self, request):
        serializer = CreateReviewDecisionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        AuditLogService.record(
            user=request.user,
            action='PRIORITY_OVERRIDDEN' if serializer.instance.is_override else 'PRIORITY_CONFIRMED',
            target_id=str(serializer.instance.id),
            target_type='ReviewDecision',
            metadata={'assessment_id': str(serializer.validated_data['assessment'].id)},
            request=request
        )
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