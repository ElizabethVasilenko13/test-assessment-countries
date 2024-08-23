import { Pipe, PipeTransform } from '@angular/core';
import { CountryShort } from '../countries.model';

@Pipe({
  name: 'countryFilter',
  standalone: true,
})
export class CountryFilterPipe implements PipeTransform {
  transform(countries: CountryShort[], searchTerm: string): CountryShort[] {
    console.log(countries);

    if (!countries || !searchTerm) {
      return countries;
    }
    return countries.filter(country =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
