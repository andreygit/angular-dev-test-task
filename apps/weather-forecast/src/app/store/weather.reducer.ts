import { IWeatherState } from "./weather.state";
import { createReducer, on, Action } from "@ngrx/store";
import { AddWeatherDailyAcition, AddWeatherHourlyAcition } from "./weather.actions";

export const initialWeatherState: IWeatherState = {
    dailyRows: [],
    hourlyRows: []
}

const reducer = createReducer(
    initialWeatherState,
    on(AddWeatherHourlyAcition, (state, action) => ({
        dailyRows: state.dailyRows, 
        hourlyRows: [...state.hourlyRows, action.row]
    })),
    on(AddWeatherDailyAcition, (state, action) => ({
        dailyRows: [...state.dailyRows, action.row], 
        hourlyRows: state.hourlyRows
    }))
    
)

export function weatherReducer(state: IWeatherState | undefined, action: Action) {
    return reducer(state, action);
}
