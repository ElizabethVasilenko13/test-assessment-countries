import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '@shared/components/snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  private snackBar = inject(MatSnackBar);

  showSnackbar(
    message = 'Oops... Temporary Server Error :(',
    isSuccess = true,
    duration = 2000
  ): void {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration,
      data: { message, isSuccess },
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }
}
