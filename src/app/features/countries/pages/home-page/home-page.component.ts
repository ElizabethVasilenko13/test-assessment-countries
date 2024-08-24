import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { CountryCardComponent } from '@features/countries/components/country-card/country-card.component';
import { CountryNextHolidayProps, CountryShortInfo } from '@features/countries/countries.model';
import { CountriesApiService } from '@features/countries/services/countries-api.service';
import { ProgressSpinerComponent } from '@shared/components/progress-spiner/progress-spiner.component';
import { FilterByPipe } from '@shared/pipes/filter-by-filed.pipe';
import { getRandomElements } from '@shared/services/get-rundom-items';
import { SnackBarService } from '@shared/services/snack-bar.service';
import { finalize, take } from 'rxjs';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FilterByPipe,
    RouterModule,
    CountryCardComponent,
    ProgressSpinerComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  private fb = inject(FormBuilder);
  private countryApiService = inject(CountriesApiService);
  protected snackBarService = inject(SnackBarService);

  countriesList: CountryShortInfo[] = [];
  randomCountriesHolidays: CountryNextHolidayProps[] = [];
  countriesForm = this.fb.group({
    country: '',
  });

  isCountriesLoading = false;
  isCountriesHolidayLoading = false;

  ngOnInit(): void {
    this.fetchCountries();
  }

  fetchCountries(): void {
    this.isCountriesLoading = true;
    this.isCountriesHolidayLoading = true;
    this.countryApiService
      .getCountries()
      .pipe(
        take(1),
        finalize(() => {
          this.isCountriesLoading = false;
        })
      )
      .subscribe({
        next: data => {
          this.countriesList = data;
          this.snackBarService.showSnackbar('Countries loaded successfully!');
          this.fetchRandomCountriesHolidays(data);
        },
        error: () => {
          this.snackBarService.showSnackbar('Failed to load countries.', false);
        },
      });
  }

  fetchRandomCountriesHolidays(countriesList: CountryShortInfo[]): void {
    const rundomCountriesAmount = 3;
    const randomCountries = getRandomElements(countriesList, rundomCountriesAmount);

    let remainingRequests = randomCountries.length;

    randomCountries.forEach(country => {
      this.countryApiService
        .getNextPublicHolidays(country.countryCode)
        .pipe(take(1))
        .subscribe({
          next: holidays => {
            const nearestNextHoliday = holidays[0];
            this.randomCountriesHolidays.push({
              ...nearestNextHoliday,
              countryName: country.name,
            });
          },
          error: () => {
            this.snackBarService.showSnackbar(
              `Failed to load holidays for ${country.name}.`,
              false
            );
          },
          complete: () => {
            remainingRequests--;
            if (remainingRequests === 0) {
              this.isCountriesHolidayLoading = false;
            }
          },
        });
    });
  }
}
