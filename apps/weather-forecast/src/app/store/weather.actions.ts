import { createAction, props } from "@ngrx/store";
import { IWeatherRow } from "./weather.state";

export const AddWeatherHourlyAcition = createAction(
    "[weather] AddWeatherHourlyAcition",
    props< {
       row: IWeatherRow 
     } >()
)

export const AddWeatherDailyAcition = createAction(
  "[weather] AddWeatherDailyAcition",
  props< {
     row: IWeatherRow 
   } >()
)
