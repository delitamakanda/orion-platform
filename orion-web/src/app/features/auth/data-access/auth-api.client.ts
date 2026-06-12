import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { API_CONFIG_TOKEN } from '@app/core/config/injection-token';
import { User } from '@app/core/models/user.model';
import { AuthResponse } from '@app/features/auth/models/auth.model';

@Service()
export class AuthApiClient {
    private readonly http = inject(HttpClient);
    private readonly config = inject(API_CONFIG_TOKEN);

    login(email: string, password: string) {
        return this.http.post<AuthResponse>(`${this.config.backendUrl}/accounts/login/`, { email, password });
    }

    register(data: Record<string, string>) {
        return this.http.post<AuthResponse>(`${this.config.backendUrl}/accounts/register/`, data);
    }

    logout() {
        return this.http.post(`${this.config.backendUrl}/accounts/logout/`, {});
    }

    getUser() {
        return this.http.get<User>(`${this.config.backendUrl}/accounts/me/`);
    }
}
