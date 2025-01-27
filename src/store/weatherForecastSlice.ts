import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Forecast, Weather } from "@/types/weatherTypes";

interface WeatherForecastState {
  data: Forecast[];
  loading: boolean;
}

const initialState: WeatherForecastState = { data: [], loading: false };

const weatherSlice = createSlice({
  name: "weatherForecast",
  initialState,
  reducers: {
    setWeatherForecast(state, action: PayloadAction<Forecast[]>) {
      state.data = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setWeatherForecast, setLoading } = weatherSlice.actions;
export default weatherSlice.reducer;
