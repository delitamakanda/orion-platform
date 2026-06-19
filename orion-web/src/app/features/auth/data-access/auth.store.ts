import { computed, inject, Service, signal } from '@angular/core';
import { AuthRepository } from './auth.repository';
import { User } from '@app/core/models/user.model';
import { finalize, throwError, catchError, tap, Observable } from 'rxjs';
import { AuthResponse } from '../models/auth.model';
import { StorageService } from '@app/core/services/storage.service';
import { Role } from '@app/core/models/role.model';

export const TOKEN_KEY = 'auth_token';

@Service()
export class AuthStore {
  private readonly repository = inject(AuthRepository);
  private readonly storage = inject(StorageService);

  private readonly _loading = signal<boolean>(false);
  private readonly _user = signal<User | null>(null);
  private readonly _error = signal<string | null>(null);
  private readonly _token = signal<string | null>(null);
  private readonly _userRole = signal<Role | null>(null);

  readonly loading = this._loading.asReadonly();
  readonly user = this._user.asReadonly();
  readonly error = this._error.asReadonly();
  readonly token = this._token.asReadonly();
  readonly userRole = computed(() => this._user()?.role as Role | null);

  login(email: string, password: string): Observable<AuthResponse> {
    this._loading.set(true);
    this._error.set(null);
    return this.repository.login(email, password).pipe(
      tap((response) => {
        this._user.set(response.user);
        this._token.set(response.token);
        this.storage.saveData(TOKEN_KEY, response.token);
      }),
      catchError((error) => {
        this._error.set(error.message || 'Login failed');
        return throwError(() => error);
      }),
      finalize(() => this._loading.set(false)),
    );
  }

  register(data: Record<string, string>): Observable<AuthResponse> {
    this._loading.set(true);
    this._error.set(null);
    return this.repository.register(data).pipe(
      tap((response) => {
        this._user.set(response.user);
        this._token.set(response.token);
        this.storage.saveData(TOKEN_KEY, response.token);
      }),
      catchError((error) => {
        this._error.set(error.message || 'Registration failed');
        return throwError(() => error);
      }),
      finalize(() => this._loading.set(false)),
    );
  }

  logout(): Observable<object> {
    this._loading.set(true);
    this._error.set(null);
    return this.repository.logout().pipe(
      tap(() => {
        this._user.set(null);
        this._token.set(null);
        this.storage.saveData(TOKEN_KEY, null);
      }),
      catchError((error) => {
        this._error.set(error.message || 'Logout failed');
        return throwError(() => error);
      }),
      finalize(() => this._loading.set(false)),
    );
  }

  fetchUser(): Observable<User> {
    this._loading.set(true);
    this._error.set(null);
    return this.repository.getUser().pipe(
      tap((user) => {
        this._user.set(user);
      }),
      catchError((error) => {
        this._error.set(error.message || 'Failed to fetch user');
        return throwError(() => error);
      }),
      finalize(() => this._loading.set(false)),
    );
  }

  hasRole(role: Role[]): boolean {
    const currentRole = this.userRole();
    return currentRole ? role.includes(currentRole) : false;
  }
}
