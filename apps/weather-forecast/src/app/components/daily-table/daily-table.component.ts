import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectWeatherDaily } from '../../store';
import { IWeatherRow } from '../../store/weather.state';

@Component({
	selector: 'bp-daily-table',
	templateUrl: './daily-table.component.html'
})
export class DailyTableComponent {
	public dailyRows$: Observable<Array<IWeatherRow>>

	constructor(private store: Store<AppState>) {
		this.dailyRows$ = this.store.select(selectWeatherDaily)
	}
}
