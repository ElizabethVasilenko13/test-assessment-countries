import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { CountryCardComponent } from '@features/countries/components/country-card/country-card.component';
import { CountryNextHolidayProps, CountryShortInfo } from '@features/countries/countries.model';
import { CountriesService } from '@features/countries/services/countries.service';
import { ProgressSpinerComponent } from '@shared/components/progress-spiner/progress-spiner.component';
import { FilterByPipe } from '@shared/pipes/filter-by-filed.pipe';
import { SnackBarService } from '@shared/services/snack-bar.service';
import { finalize } from 'rxjs';

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
  private countriesService = inject(CountriesService);
  protected snackBarService = inject(SnackBarService);

  countriesList: CountryShortInfo[] = [];
  randomCountriesHolidays: CountryNextHolidayProps[] = [];
  countriesForm = this.fb.group({
    country: '',
  });
  isCountriesLoading = false;

  ngOnInit(): void {
    this.fetchCountries();
  }

  fetchCountries(): void {
    this.isCountriesLoading = true;

    this.countriesService
      .getCountriesAndHolidays()
      .pipe(
        finalize(() => {
          this.isCountriesLoading = false;
        })
      )
      .subscribe({
        next: data => {
          this.countriesList = data.countries;
          this.randomCountriesHolidays = data.holidays;
          this.snackBarService.showSnackbar('Countries and holidays loaded successfully!');
        },
        error: () => {
          this.snackBarService.showSnackbar('Failed to load data.', false);
        },
      });
  }
}
