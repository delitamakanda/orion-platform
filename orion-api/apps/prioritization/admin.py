from django.contrib import admin
from apps.prioritization.models import PriorityAssessment, PriorityRecommendation, ReviewDecision

class PriorityRecommendationInline(admin.TabularInline):
    model = PriorityRecommendation
    can_delete = False

class ReviewDecisionInline(admin.TabularInline):
    model = ReviewDecision
    can_delete = False

class PriorityAssessmentAdmin(admin.ModelAdmin):
    list_display = ('id', 'level', 'complaint__title', 'created_at', 'updated_at')
    search_fields = ('level', 'complaint__title', 'created_at', 'updated_at')
    list_filter = ('level', 'complaint__title', 'created_at', 'updated_at')
    inlines = [PriorityRecommendationInline, ReviewDecisionInline]


admin.site.register(PriorityAssessment, PriorityAssessmentAdmin)

