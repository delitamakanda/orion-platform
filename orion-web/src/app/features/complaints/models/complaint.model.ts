 export type PriorityLevel = 'low' | 'medium' | 'high' | 'critical';

export interface ExternalComplaint {
  external_id: string;
  source_system: string;
  victim_type: string;
  facts: string;
  received_at: string;
}

export interface ComplaintFilter {
  source_system?: string;
  reference?: string;
  category?: string;
  location?: string;
  status?: string;
  vulnerability_victim?: boolean;
  incident_date_lte?: string;
  incident_date_gte?: string;
  created_at_lte?: string;
  created_at_gte?: string;
}

export interface Complaint {
  id: string;
  reference: string;
  title: string;
  source_system: string;
  original_external_id: string;
  description: string;
  category: string;
  location: string;
  incident_date: string;
  status: 'imported' | 'analyzed' | 'reviewed' | 'closed';
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