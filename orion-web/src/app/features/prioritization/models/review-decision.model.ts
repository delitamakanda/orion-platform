import { User } from "@app/core/models/user.model";
import { PriorityAssessment } from "./ai-analysis.model";
import { PriorityLevel } from "./priority-level.model";

export interface ReviewDecision {
    assessment: PriorityAssessment;
    reviewer: User;
    previous_level: PriorityLevel;
    final_level: PriorityLevel;
    comment: string;
    is_override: boolean;
}