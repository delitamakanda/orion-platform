import { inject, Service } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export enum SNACK_BAR_MESSAGE_TYPE {
  success = 'green-success-snackbar',
  error = 'red-error-snackbar',
  info = 'blue-info-snackbar',
  warning = 'orange-warning-snackbar',
}

@Service()
export class SnackbarService {
  private readonly snackbar = inject(MatSnackBar);

  showSnackbar(context: string, message: string, action: 'Close' | 'Undo' | 'Retry' = 'Close', duration = 3000): void {
    this.snackbar.open(message, action, {
      duration: duration,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: [context || SNACK_BAR_MESSAGE_TYPE.info],
    });
  }

  showSuccessSnackbar(message: string, action: 'Close' | 'Undo' | 'Retry' = 'Close', duration = 3000): void {
    this.showSnackbar(SNACK_BAR_MESSAGE_TYPE.success, message, action, duration);
  }

  showErrorSnackbar(message: string, action: 'Close' | 'Undo' | 'Retry' = 'Close', duration = 3000): void {
    this.showSnackbar(SNACK_BAR_MESSAGE_TYPE.error, message, action, duration);
  }

  showWarningSnackbar(message: string, action: 'Close' | 'Undo' | 'Retry' = 'Close', duration = 3000): void {
    this.showSnackbar(SNACK_BAR_MESSAGE_TYPE.warning, message, action, duration);
  }

  closeSnackbar(): void {
    this.snackbar.dismiss();
  }
}
