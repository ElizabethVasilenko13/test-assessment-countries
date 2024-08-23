import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-country-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './country-card.component.html',
  styleUrl: './country-card.component.scss',
})
export class CountryCardComponent {
  @Input() countryName = 'Unknown Country';
  @Input() holidayName = 'No Holiday Name';
  @Input() holidaydate: Date = new Date();
  @Input() routePath = '';
}
