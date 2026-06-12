import { inject, Service } from '@angular/core';
import { AuthApiClient } from './auth-api.client';

@Service()
export class AuthRepository {
    private readonly api = inject(AuthApiClient);

    login(email: string, password: string) {
        return this.api.login(email, password);
    }

    register(data: Record<string, string>) {
        return this.api.register(data);
    }

    logout() {
        return this.api.logout();
    }

    getUser() {
        return this.api.getUser();
    }
}
