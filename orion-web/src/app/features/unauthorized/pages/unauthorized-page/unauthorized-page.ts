import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MATERIAL_IMPORTS } from '@app/shared/material.imports';

@Component({
  selector: 'app-unauthorized-page',
  imports: [MATERIAL_IMPORTS],
  templateUrl: './unauthorized-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnauthorizedPage {
  goBack(): void {
    history.back();
  }
}
