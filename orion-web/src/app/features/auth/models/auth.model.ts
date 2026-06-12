import { User } from "@app/core/models/user.model";

export interface AuthResponse {
    token: string;
    user: User;
}
