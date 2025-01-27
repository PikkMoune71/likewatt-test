"use client";
import { useEffect, useState } from "react";
import { getWeatherForecast } from "../services/weatherForecastService";
import { Card } from "./ui/card";
import { getWeatherIconUrl } from "@/composables/useWeatherIcon";
import { Forecast } from "@/types/weatherTypes";
import { getDayName, formatDate } from "@/composables/useFormatDate";
import { useDispatch, useSelector } from "react-redux";
import { setWeatherForecast, setLoading } from "@/store/weatherForecastSlice";
import Image from "next/image";

const WeatherForecast = () => {
  const dispatch = useDispatch();
  const weatherForecast = useSelector(
    (state: any) => state.weatherForecast.data
  );
  const loading = useSelector((state: any) => state.weatherForecast.loading);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        dispatch(setLoading(true));
        try {
          const weather = await getWeatherForecast(
            latitude.toString(),
            longitude.toString()
          );

          dispatch(setWeatherForecast(weather));
        } catch (error) {
          setError("Erreur lors de la récupération des prévisions météo");
        } finally {
          dispatch(setLoading(false));
        }
      });
    } else {
      setError("La géolocalisation n'est pas supportée par ce navigateur.");
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const groupForecastsByDate = (
    forecasts: Forecast[] = []
  ): { [key: string]: Forecast[] } => {
    const groupedData: { [key: string]: Forecast[] } = {};

    forecasts.forEach((forecast) => {
      const date = new Date(forecast.dt * 1000).toLocaleDateString();
      if (!groupedData[date]) {
        groupedData[date] = [];
      }
      groupedData[date].push(forecast);
    });

    return groupedData;
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold mb-6">
        Prévisions météo sur 5 jours
      </h1>
      {loading && <p className="text-lg text-gray-500">Chargement...</p>}
      {error && <p className="text-lg text-red-500">{error}</p>}
      {weatherForecast && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {Object.keys(groupForecastsByDate(weatherForecast.list)).map(
            (date, index) => {
              const dailyForecast = groupForecastsByDate(weatherForecast.list)[
                date
              ][0];
              const iconUrl = getWeatherIconUrl(dailyForecast.weather[0].icon);
              const dayName = getDayName(dailyForecast.dt);
              const formattedDate = formatDate(dailyForecast.dt);

              return (
                <div key={index}>
                  <Card className="p-6 shadow-lg rounded-3xl bg-white flex flex-col items-center">
                    <p className="text-xl font-bold mb-2">
                      {dayName} {formattedDate}
                    </p>{" "}
                    <Image
                      src={iconUrl}
                      alt={dailyForecast.weather[0].description}
                      width={128}
                      height={128}
                      className="w-32 h-32 mb-4"
                    />
                    <p className="text-2xl font-semibold">
                      {dailyForecast.main.temp}°C
                    </p>
                    <p className="text-gray-600 mt-2">
                      {dailyForecast.weather[0].description}
                    </p>
                    <div className="mt-4 text-gray-500 text-sm">
                      <p>
                        Min: {dailyForecast.main.temp_min}°C | Max:{" "}
                        {dailyForecast.main.temp_max}°C
                      </p>
                    </div>
                  </Card>
                </div>
              );
            }
          )}
        </div>
      )}
    </div>
  );
};

export default WeatherForecast;
