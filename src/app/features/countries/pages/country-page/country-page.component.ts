import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CountryHolidayResponse, CountryFullInfo } from '@features/countries/countries.model';
import { CountriesApiService } from '@features/countries/services/countries-api.service';
import { ProgressSpinerComponent } from '@shared/components/progress-spiner/progress-spiner.component';
import { generateRange } from '@shared/services/array-transforms';
import { SnackBarService } from '@shared/services/snack-bar.service';
import { finalize, take } from 'rxjs';

@Component({
  selector: 'app-country-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule, ProgressSpinerComponent],
  templateUrl: './country-page.component.html',
  styleUrl: './country-page.component.scss',
})
export class CountryPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private titleService = inject(Title);
  private countryApiService = inject(CountriesApiService);
  protected snackBarService = inject(SnackBarService);

  selectedYear = new Date().getFullYear();
  availableYears: number[] = [];
  countryData: CountryFullInfo | null = null;
  countryHolidays: CountryHolidayResponse[] = [];
  isCountryHolidaysLoading = false;

  countryCode: string;

  constructor() {
    const countryId = this.route.snapshot.paramMap.get('countryID') || '';
    this.countryCode = countryId;
  }

  ngOnInit(): void {
    this.initYears();
    this.fetchCountryData(this.countryCode);
    this.fetchCountryHolidays(this.selectedYear, this.countryCode);
  }

  initYears(): void {
    const startYear = 2020;
    const endYear = 2030;
    this.availableYears = generateRange(startYear, endYear);
  }

  fetchCountryData(countryCode: string): void {
    this.countryApiService
      .getCountryInfo(countryCode)
      .pipe(take(1))
      .subscribe({
        next: countryData => {
          this.countryData = countryData;
          this.titleService.setTitle(countryData.commonName || 'Country');
          this.snackBarService.showSnackbar('Country data loaded successfully!');
        },
        error: () => {
          this.snackBarService.showSnackbar('Failed to load country data.', false);
        },
      });
  }

  fetchCountryHolidays(year: number, countryCode: string): void {
    this.isCountryHolidaysLoading = true;
    this.countryApiService
      .getCountryHolidays(year, countryCode)
      .pipe(
        take(1),
        finalize(() => {
          this.isCountryHolidaysLoading = false;
        })
      )
      .subscribe({
        next: countryHolidaysData => {
          this.countryHolidays = countryHolidaysData;
          this.snackBarService.showSnackbar(`Holidays for ${year} loaded successfully!`);
        },
        error: () => {
          this.snackBarService.showSnackbar(`Failed to load holidays for ${year}.`, false);
        },
      });
  }

  onYearChange(year: number): void {
    this.selectedYear = year;
    this.fetchCountryHolidays(year, this.countryCode);
  }
}
