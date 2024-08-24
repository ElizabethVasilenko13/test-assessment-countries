import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CountryHolidayResponse, CountryFullInfo } from '@features/countries/countries.model';
import { CountriesApiService } from '@features/countries/services/countries-api.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-country-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './country-page.component.html',
  styleUrl: './country-page.component.scss',
})
export class CountryPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private titleService = inject(Title);
  private countryApiService = inject(CountriesApiService);

  selectedYear = new Date().getFullYear();
  availableYears: number[] = [];
  countryData: CountryFullInfo | null = null;
  countryHolidays: CountryHolidayResponse[] = [];

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
    this.availableYears = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);
  }

  fetchCountryData(countryCode: string): void {
    this.countryApiService
      .getCountryInfo(countryCode)
      .pipe(take(1))
      .subscribe(data => {
        this.countryData = data;
        this.titleService.setTitle(this.countryData.commonName || 'Country');
      });
  }

  fetchCountryHolidays(year: number, countryCode: string): void {
    this.countryApiService
      .getCountryHolidays(year, countryCode)
      .pipe(take(1))
      .subscribe(data => {
        this.countryHolidays = data;
      });
  }

  onYearChange(year: number): void {
    this.selectedYear = year;
    this.fetchCountryHolidays(year, this.countryCode);
  }

  trackByHoliday(index: number): number {
    return index;
  }
}
