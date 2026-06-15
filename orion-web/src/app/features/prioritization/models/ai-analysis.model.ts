import { PriorityLevel } from "./priority-level.model";

export interface AIAnalysis {
  priority_level: PriorityLevel;
  confidence_score: number;
  recommended_actions: string[];
  summary: string;
  detected_risks: string[];
  score: number;
  explanation: string;
}