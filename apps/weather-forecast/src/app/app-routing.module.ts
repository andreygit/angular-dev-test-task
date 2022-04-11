import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { HourlyTableComponent } from './components/hourly-table/hourly-table.component';
import { DailyTableComponent } from './components/daily-table/daily-table.component';

export const DAILY_ROUTE = "daily"
export const HOURLY_ROUTE = "hourly"
export const CITY_QUERY_PARAM = "hourly"

const routes: Routes = [
    { path: "", redirectTo: `/${DAILY_ROUTE}`, pathMatch: 'full' },
    { path: HOURLY_ROUTE, component: HourlyTableComponent },
    { path: `${HOURLY_ROUTE}/:${CITY_QUERY_PARAM}`, component: HourlyTableComponent },
    { path: DAILY_ROUTE, component: DailyTableComponent },
    { path: `${DAILY_ROUTE}/:${CITY_QUERY_PARAM}`, component: DailyTableComponent },
]

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }