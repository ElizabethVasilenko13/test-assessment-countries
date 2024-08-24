import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CountryFullInfo, CountryHolidayResponse, CountryShortInfo } from '../countries.model';

@Injectable({
  providedIn: 'root',
})
export class CountriesApiService {
  private http = inject(HttpClient);

  private readonly GET_COUNTIRES_ENDPOINT = 'AvailableCountries';
  private readonly GET_COUNTRY_INFO_ENDPOINT = 'CountryInfo';
  private readonly GET_COUNTRY_HOLIDAYS_ENDPOINT = 'PublicHolidays';
  private readonly GET_COUNTRY_NEXT_HOLIDAYS_ENDPOINT = 'NextPublicHolidays';

  getCountries(): Observable<CountryShortInfo[]> {
    return this.http.get<CountryShortInfo[]>(this.GET_COUNTIRES_ENDPOINT);
  }

  getCountryInfo(countryCode: string): Observable<CountryFullInfo> {
    return this.http.get<CountryFullInfo>(`${this.GET_COUNTRY_INFO_ENDPOINT}/${countryCode}`);
  }

  getCountryHolidays(year: number, countryCode: string): Observable<CountryHolidayResponse[]> {
    return this.http.get<CountryHolidayResponse[]>(
      `${this.GET_COUNTRY_HOLIDAYS_ENDPOINT}/${year}/${countryCode}`
    );
  }

  getNextPublicHolidays(countryCode: string): Observable<CountryHolidayResponse[]> {
    return this.http.get<CountryHolidayResponse[]>(
      `${this.GET_COUNTRY_NEXT_HOLIDAYS_ENDPOINT}/${countryCode}`
    );
  }
}
