export interface CountryShortInfo {
  countryCode: string;
  name: string;
}

export interface CountryHolidayResponse {
  date: Date;
  localName: string;
  name: string;
  countryCode: string;
  global: true;
  counties: [string];
  launchYear: number;
  types: ['Public'];
}

export interface CountryNextHolidayProps extends CountryHolidayResponse {
  countryName: string;
}

export interface CountryFullInfo {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: [string];
}
