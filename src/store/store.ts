import { configureStore } from "@reduxjs/toolkit";
import solarPanelSlice from "./slices/solarPanelSlice";
import weatherForecastReducer from "./slices/weatherForecastSlice";

export const store = configureStore({
  reducer: {
    panels: solarPanelSlice,
    weatherForecast: weatherForecastReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
