import { inject, Injectable } from '@angular/core';
import { CountriesApiService } from './countries-api.service';
import { getRandomElements } from '@shared/services/array-transforms';
import { Observable, take, map, forkJoin, switchMap } from 'rxjs';
import { CountryShortInfo, CountryNextHolidayProps } from '../countries.model';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private countryApiService = inject(CountriesApiService);

  getCountriesAndHolidays(): Observable<{
    countries: CountryShortInfo[];
    holidays: CountryNextHolidayProps[];
  }> {
    return this.countryApiService.getCountries().pipe(
      take(1),
      switchMap(countriesList => {
        const rundomCountriesAmount = 3;
        const randomCountries = getRandomElements(countriesList, rundomCountriesAmount);
        const randomHolidayRequests = randomCountries.map(country =>
          this.countryApiService.getNextPublicHolidays(country.countryCode).pipe(
            map(holidaysData => {
              const nearestNextHoliday = holidaysData[0];
              return {
                ...nearestNextHoliday,
                countryName: country.name,
              };
            })
          )
        );

        return forkJoin(randomHolidayRequests).pipe(
          map(holidays => ({
            countries: countriesList,
            holidays,
          }))
        );
      })
    );
  }
}
