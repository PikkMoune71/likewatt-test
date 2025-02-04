"use client";
import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { getWeatherIconUrl } from "@/composables/useWeatherIcon";
import { Forecast } from "@/types/weatherTypes";
import { getDayName, formatDate } from "@/composables/useFormatDate";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { AppDispatch } from "@/store/store";
import { fetchWeatherForecast } from "@/store/actions/weatherForecastAction";
import Loader from "./Loader";

const WeatherForecast = () => {
  const dispatch = useDispatch<AppDispatch>();
  const weatherForecast = useSelector(
    (state: any) => state.weatherForecast.data
  );
  const loading = useSelector((state: any) => state.weatherForecast.loading);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        dispatch(fetchWeatherForecast());
      } catch (error) {
        setError("Failed to load weather forecast");
      }
    };
    fetchWeather();
  }, [dispatch]);

  const groupForecastsByDate = (
    forecasts: Forecast[] = []
  ): { [key: string]: Forecast[] } => {
    return forecasts.reduce((acc, forecast) => {
      const date = new Date(forecast.dt * 1000).toLocaleDateString();
      acc[date] = acc[date] ? [...acc[date], forecast] : [forecast];
      return acc;
    }, {} as { [key: string]: Forecast[] });
  };

  return (
    <div>
      {loading && <Loader label="Chargement de la météo.." />}
      {error && <p className="text-lg text-red-500">{error}</p>}
      {weatherForecast && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {Object.entries(groupForecastsByDate(weatherForecast.list)).map(
            ([date, dailyForecasts], index) => {
              const dailyForecast = dailyForecasts[0];
              const iconUrl = getWeatherIconUrl(dailyForecast.weather[0].icon);
              const dayName = getDayName(dailyForecast.dt);
              const formattedDate = formatDate(dailyForecast.dt);

              if (index === 0) {
                return (
                  <div key={index} className="col-span-full">
                    <Card
                      className="p-8 shadow-lg rounded-3xl bg-primary flex flex-col items-center border-2 text-white"
                      style={{
                        backgroundImage:
                          "linear-gradient(43deg, rgb(0, 59, 88) 0%, rgb(0, 138, 125) 100%)",
                      }}
                    >
                      <div className="flex items-center justify-between w-full flex-col sm:flex-row">
                        <div>
                          <p className="text-5xl font-extrabold mb-4">
                            {weatherForecast.city?.name},{" "}
                            {weatherForecast.city?.country}
                          </p>
                          <p className="text-2xl font-extrabold mb-4">
                            {dayName} {formattedDate}
                          </p>
                          <p className="text-4xl font-bold">
                            {Math.round(dailyForecast.main.temp)}°C
                          </p>
                          <p className="mt-3 text-lg capitalize">
                            {dailyForecast.weather[0].description}
                          </p>
                          <div className="mt-4 text-sm">
                            <p>
                              Min: {Math.round(dailyForecast.main.temp_min)}°C |
                              Max: {Math.round(dailyForecast.main.temp_max)}°C
                            </p>
                          </div>
                        </div>
                        <Image
                          src={iconUrl}
                          alt={dailyForecast.weather[0].description}
                          width={300}
                          height={300}
                        />
                      </div>
                    </Card>
                  </div>
                );
              }
              return (
                <div key={index}>
                  <Card className="p-6 shadow-lg rounded-3xl flex flex-col items-center">
                    <p className="text-xl font-bold mb-2">
                      {dayName} {formattedDate}
                    </p>
                    <Image
                      src={iconUrl}
                      alt={dailyForecast.weather[0].description}
                      width={128}
                      height={128}
                      className="w-32 h-32 mb-4"
                    />
                    <p className="text-2xl font-semibold">
                      {Math.round(dailyForecast.main.temp)}°C
                    </p>
                    <p className="text-gray-600 mt-2 capitalize">
                      {dailyForecast.weather[0].description}
                    </p>
                    <div className="mt-4 text-gray-500 text-sm">
                      <p>
                        Min: {Math.round(dailyForecast.main.temp_min)}°C | Max:{" "}
                        {Math.round(dailyForecast.main.temp_max)}°C
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
