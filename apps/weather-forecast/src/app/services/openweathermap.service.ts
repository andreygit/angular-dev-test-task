import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, switchMap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { TemperatureData } from '../store/weather.state';

export interface ICityCoords {
	lat: number,
	lon: number
}

export interface IDailyResponse {
	daily: Array<{ dt: number, temp: { eve: number } }>
}

export interface IHourlyResponse {
	hourly: Array<{ dt: number, temp: number }>
}

export const ERROR_CITY_NOT_FOUD = "City not found"
@Injectable({
	providedIn: 'root'
})
export class OpenweathermapService {
	private APIkey = environment.API_KEY
	private cityCache: { [city: string]: ICityCoords } = {}

	constructor(private httpClient: HttpClient) { }

	public getCoords(cityName: string) {
		if (this.cityCache[cityName]) {
			return of(this.cityCache[cityName])
		} else {
			return this.httpClient.get<Array<ICityCoords>>(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${this.APIkey}`).pipe(
				map(response => {
					if (response[0]?.lat && response[0]?.lon) {
						this.cityCache[cityName] = {
							lat: response[0]?.lat,
							lon: response[0]?.lon
						}
						return this.cityCache[cityName]
					} else {
						return undefined
					}
				})
			)
		}
	}

	public getDaily(lat: number, lon: number): Observable<TemperatureData> {
		return this.httpClient.get<IDailyResponse>(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${this.APIkey}&units=metric`)
			.pipe(
				map((data) =>
					data.daily.map(day => {
						return {
							date: new Date(day.dt * 1000),
							temperature: Math.round(day.temp.eve)
						}
					})
				)
			)
	}

	public getHourly(lat: number, lon: number): Observable<TemperatureData> {
		return this.httpClient.get<IHourlyResponse>(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily,alerts&appid=${this.APIkey}&units=metric`)
			.pipe(
				map((data) =>
					data.hourly.map(hour => {
						return {
							date: new Date(hour.dt * 1000),
							temperature: Math.round(hour.temp)
						}
					})
				)
			)
	}

	public getCityWeatherDaily(cityName: string) {
		return this.getCoords(cityName).pipe(
			switchMap((city: ICityCoords | undefined) => {
				if (city?.lat && city?.lon) {
					return this.getDaily(city.lat, city.lon)
				} else {
					return throwError(() => { return { code: ERROR_CITY_NOT_FOUD } })
				}
			})
		)
	}

	public getCityWeatherHourly(cityName: string) {
		return this.getCoords(cityName).pipe(
			switchMap((city: ICityCoords | undefined) => {
				if (city?.lat && city?.lon) {
					return this.getHourly(city.lat, city.lon)
				} else {
					return throwError(() => { return { code: ERROR_CITY_NOT_FOUD } })
				}
			})
		)
	}

}
