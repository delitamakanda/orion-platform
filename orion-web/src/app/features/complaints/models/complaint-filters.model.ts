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