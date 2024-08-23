import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { CountryCardComponent } from '@features/components/country-card/country-card.component';
import {
  CountryNextHolidayProps,
  CountryNextHolidayResponse,
  CountryShort,
} from '@features/countries/countries.model';
import { CountryFilterPipe } from '@features/countries/pipes/country-filter.pipe';
import { getRandomElements } from '@shared/services/get-rundom-els';
import { take } from 'rxjs';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CountryFilterPipe,
    RouterModule,
    CountryCardComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  countriesList: CountryShort[] = [];
  randomCountriesHolidays: CountryNextHolidayProps[] = [];
  countriesForm = this.fb.group({
    country: '',
  });

  ngOnInit(): void {
    this.fetchCountries();
  }

  fetchCountries(): void {
    this.http
      .get<CountryShort[]>('AvailableCountries')
      .pipe(take(1))
      .subscribe(data => {
        this.countriesList = data;
        this.fetchRandomCountriesHolidays(data);
      });
  }

  trackByCountryCode(index: number, country: CountryShort): string {
    return country.countryCode;
  }

  fetchRandomCountriesHolidays(countriesList: CountryShort[]): void {
    const rundomCountriesAmount = 3;
    const randomCountryCodes = getRandomElements(countriesList, rundomCountriesAmount);

    randomCountryCodes.forEach(country => {
      this.http
        .get<CountryNextHolidayResponse[]>(`NextPublicHolidays/${country.countryCode}`)
        .pipe(take(1))
        .subscribe(holidays => {
          const nearestNextHoliday = holidays[0];
          this.randomCountriesHolidays.push({
            ...nearestNextHoliday,
            countryName: country.name,
          });
        });
    });
  }
}
