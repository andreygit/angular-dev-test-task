import { createSelector } from '@ngrx/store';
import { IWeatherState } from './weather.state';

export interface AppState {
    readonly weather: IWeatherState
}

export const selectWeatherState = (state: AppState) => state.weather

export const selectWeatherDaily = createSelector(
    selectWeatherState,
    (state: IWeatherState) => state.dailyRows
)

export const getDailyRowByCityName = (cityName: string) => { 
    return createSelector(
        selectWeatherState,
        (state: IWeatherState) => state.dailyRows.find(row => row.city === cityName)
    )
}

export const selectWeatherHourly = createSelector(
    selectWeatherState,
    (state: IWeatherState) => state.hourlyRows
)

export const getHourlyRowByCityName = (cityName: string) => { 
    return createSelector(
        selectWeatherState,
        (state: IWeatherState) => state.hourlyRows.find(row => row.city === cityName)
    )
}
