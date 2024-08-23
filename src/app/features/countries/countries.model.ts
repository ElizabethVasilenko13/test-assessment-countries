export interface CountryShort {
  countryCode: string;
  name: string;
}

export interface CountryNextHolidayResponse {
  date: Date;
  localName: string;
  name: string;
  countryCode: string;
  global: true;
  counties: [string];
  launchYear: number;
  types: ['Public'];
}

export interface CountryNextHolidayProps extends CountryNextHolidayResponse {
  countryName: string;
}
