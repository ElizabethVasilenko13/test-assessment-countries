import { Routes } from '@angular/router';
import { AppRoutes } from '@shared/enums/routes.enum';
import { CountryPageComponent } from './features/countries/pages/country-page/country-page.component';
import { HomePageComponent } from './features/countries/pages/home-page/home-page.component';

export const routes: Routes = [
  { path: AppRoutes.MAIN_PAGE_ROUTE, title: 'Home', component: HomePageComponent },
  { path: AppRoutes.COUNTRY_PAGE_ROUTE, title: 'Home', component: CountryPageComponent },
];
