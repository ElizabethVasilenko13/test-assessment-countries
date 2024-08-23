import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { CountryShort } from '@features/countries/countries.model';
import { CountryFilterPipe } from '@features/countries/pipes/country-filter.pipe';
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
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  countriesList: CountryShort[] = [];
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
      });
  }

  trackByCountryCode(index: number, country: CountryShort): string {
    return country.countryCode;
  }

  // getRandomElements<T>(count: number): T[] {
  //   const array: T[] = [];
  //   for (let i = 0; i < count; i++){

  //   }
  // }
}
