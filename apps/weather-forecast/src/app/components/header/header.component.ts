import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DefaultUrlSerializer, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, of, switchMap } from 'rxjs';
import { DAILY_ROUTE, HOURLY_ROUTE } from '../../app-routing.module';
import { OpenweathermapService, ERROR_CITY_NOT_FOUD } from '../../services/openweathermap.service';
import { AppState, getDailyRowByCityName, getHourlyRowByCityName } from '../../store';
import { AddWeatherDailyAcition, AddWeatherHourlyAcition } from '../../store/weather.actions';
import { IWeatherInfo, TemperatureData } from '../../store/weather.state';

@Component({
	selector: 'bp-header',
	templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

	public cityInput = new FormControl("")
	public searchForm: FormGroup
	public readonly DAILY_ROUTE = DAILY_ROUTE
	public readonly HOURLY_ROUTE = HOURLY_ROUTE
	private currentPath: string = ""
	private currentCity: string = ""

	
	constructor(private router: Router, private openweathermap: OpenweathermapService, private store: Store<AppState>) {
		this.searchForm = new FormGroup({
			cityInput: this.cityInput
		})
	}

	isLinkActive(link: string) {
		return link === this.currentPath
	}

	submitCity(): void {
		const cityName = this.cityInput.value
		
		if (this.currentPath === DAILY_ROUTE) {
			this.store.select(getDailyRowByCityName(cityName)).pipe(
			 	switchMap(row => {
					if (!row) {
						return this.openweathermap.getCityWeatherDaily(cityName)
					} else {
						return of(undefined)
					}
				})
			).subscribe({
				next: (data: TemperatureData | undefined) => {
					if (data) {
						const temperature: Array<IWeatherInfo> = data.slice(0, 7)
						this.store.dispatch(AddWeatherDailyAcition({ 
							row: { 
								city: cityName, 
								temperature: temperature 
							} 
						}))
					}
				},
				error: (error: { code: string }) => {
					if (error.code === ERROR_CITY_NOT_FOUD) {
						this.cityInput.setErrors({isWrong: true})
					}
					
				}
			})
		}
		if (this.currentPath === HOURLY_ROUTE) {
			this.store.select(getHourlyRowByCityName(cityName)).pipe(
				switchMap(row => {
					if (!row) {
						return this.openweathermap.getCityWeatherHourly(cityName)
					} else {
						return of(undefined)
					}
				})
			).subscribe( {
				next: (data: TemperatureData | undefined) => {
					if (data) {
						const temperature: Array<IWeatherInfo> = 
						data.filter((row, index) => index % 3 === 0).slice(0, 8)
						this.store.dispatch(AddWeatherHourlyAcition({ 
							row: { 
								city: cityName, 
								temperature 
							} 
						}))

					}
				},
				error: (error) => {
					if (error.code === ERROR_CITY_NOT_FOUD) {
						this.cityInput.setErrors({isWrong: true})
					}
				}	
			})
		}
		
		this.router.navigate([], { queryParams: { city: cityName } })
	}

	ngOnInit(): void {
		this.router.events.pipe(
			filter(event => event instanceof NavigationEnd)
		)
		.subscribe(event => {

			const url = (event as NavigationEnd).urlAfterRedirects
			const dus = new DefaultUrlSerializer()
			this.currentCity = dus.parse(url).queryParams.city
			this.currentPath = url.includes("?") ? url.substring(1, url.indexOf('?')) : url.substring(1)
						
			this.cityInput.setValue(this.currentCity)
			
		})
	}
}
