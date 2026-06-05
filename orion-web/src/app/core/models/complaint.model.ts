export type PriorityLevel = 'low' | 'medium' | 'high' | 'critical';

export interface Complaint {
  id: string;
  reference: string;
  title: string;
  description: string;
  category: string;
  location: string;
  incident_date: string;
  status: 'new' | 'in_progress' | 'assigned' | 'closed';
  declared_urgency: number;
  vulnerability_victim: boolean;
  created_at: string;
  updated_at: string;
  ai_analysis: AIAnalysis;
}

export interface AIAnalysis {
  priority_level: PriorityLevel;
  confidence_score: number;
  recommended_actions: string[];
  summary: string;
  detected_risks: string[];
  score: number;
  explanation: string;
}