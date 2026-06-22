import { Complaint } from '@app/features/complaints/models/complaint.model';
import { PriorityLevel } from './priority-level.model';

export interface PriorityAssessment {
  id: string;
  complaint: Complaint;
  level: PriorityLevel;
  confidence_score: number;
  summary: string;
  score: number;
  explanation: Record<string, string | boolean | number>;
  model_name: string;
  provider: string;
}

export interface PriorityRecommendation {
  assessment: PriorityAssessment;
  label: string;
  weight: number;
  description: string;
}
