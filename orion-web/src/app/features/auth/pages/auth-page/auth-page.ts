import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { form, FormField, required, email, submit } from '@angular/forms/signals';
import { AuthStore } from '../../data-access/auth.store';
import { MATERIAL_IMPORTS } from '@app/shared/material.imports';
import { Router } from '@angular/router';

interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}

@Component({
  selector: 'app-auth-page',
  imports: [
    FormField,
    MATERIAL_IMPORTS,
  ],
  templateUrl: './auth-page.html',
  styleUrls: ['./auth-page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthPage {
  private readonly router = inject(Router);
  readonly store = inject(AuthStore);
  loginModel = signal<LoginData>({
    email: '',
    password: '',
    rememberMe: false,
  });

  loginForm = form(this.loginModel, (fieldPath) => {
    required(fieldPath.email, { message: 'Email is required' });
    email(fieldPath.email, { message: 'Invalid email format' });
    required(fieldPath.password, { message: 'Password is required' });
  });

  onSubmit(event: Event) {
    event.preventDefault();
    submit(this.loginForm, async () => {
      const { email, password } = this.loginModel();
      this.store.login(email, password).subscribe({
        next: () => {
          // Handle successful login, e.g., navigate to dashboard
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          // Handle login error, e.g., show error message
          console.error('Login failed:', error);
        }
      });
    });
  }

  clearForm() {
    this.loginModel.set({
      email: '',
      password: '',
      rememberMe: false,
    });
  }
}
