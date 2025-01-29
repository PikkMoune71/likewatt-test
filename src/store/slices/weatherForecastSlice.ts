import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Forecast, Weather } from "@/types/weatherTypes";
import { fetchWeatherForecast } from "../actions/weatherForecastAction";

interface WeatherForecastState {
  data: Forecast[];
  loading: boolean;
  error: string | null;
}

const initialState: WeatherForecastState = {
  data: [],
  loading: false,
  error: null,
};

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherForecast.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherForecast.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchWeatherForecast.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export const { setWeatherForecast, setLoading } = weatherSlice.actions;
export default weatherSlice.reducer;
