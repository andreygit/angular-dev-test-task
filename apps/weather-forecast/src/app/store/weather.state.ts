export interface IWeatherInfo {
    date: Date
    temperature: number
}

export type TemperatureData = Array<IWeatherInfo>

export interface IWeatherRow {
    city: string
    temperature: Array<IWeatherInfo>
}

export interface IWeatherState {
    hourlyRows: Array<IWeatherRow>
    dailyRows: Array<IWeatherRow>
}
