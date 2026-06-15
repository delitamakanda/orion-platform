import { ComplaintStatus } from "./complaint-status.model";

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
  status: ComplaintStatus;
  declared_urgency: number;
  vulnerability_victim: boolean;
  created_at: string;
  updated_at: string;
}

