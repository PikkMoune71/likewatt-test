import { createAsyncThunk } from "@reduxjs/toolkit";
import { getWeatherForecast } from "@/services/weatherForecastService";
import { Forecast } from "@/types/weatherTypes";

export const fetchWeatherForecast = createAsyncThunk<
  Forecast[],
  void,
  { rejectValue: string }
>("weatherForecast/fetchWeatherForecast", async (_, { rejectWithValue }) => {
  if (!navigator.geolocation) {
    return rejectWithValue(
      "La géolocalisation n'est pas supportée par ce navigateur."
    );
  }

  try {
    const position = await new Promise<GeolocationPosition>(
      (resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, () =>
          reject(new Error("Impossible d'obtenir la position géographique"))
        );
      }
    );

    const { latitude, longitude } = position.coords;
    const weather = await getWeatherForecast(
      latitude.toString(),
      longitude.toString()
    );

    console.log("Weather Forecast:", weather);
    return weather;
  } catch (error) {
    return rejectWithValue(
      (error as Error).message ||
        "Erreur lors de la récupération des prévisions météo"
    );
  }
});
