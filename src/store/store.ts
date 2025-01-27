import { configureStore } from "@reduxjs/toolkit";
import panelsReducer from "./solarPanelSlice";
import weatherForecastReducer from "./weatherForecastSlice";

export const store = configureStore({
  reducer: {
    panels: panelsReducer,
    weatherForecast: weatherForecastReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
