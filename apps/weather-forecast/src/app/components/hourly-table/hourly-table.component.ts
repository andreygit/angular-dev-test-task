import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectWeatherHourly } from '../../store';
import { IWeatherRow } from '../../store/weather.state';

@Component({
	selector: 'bp-hourly-table',
	templateUrl: './hourly-table.component.html'
})
export class HourlyTableComponent {

	public hourlyRows$: Observable<Array<IWeatherRow>>

	constructor(private store: Store<AppState>) {
		this.hourlyRows$ = this.store.select(selectWeatherHourly)
	}

}
