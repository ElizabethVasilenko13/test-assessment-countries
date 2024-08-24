import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-progress-spiner',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './progress-spiner.component.html',
  styleUrl: './progress-spiner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressSpinerComponent {}
