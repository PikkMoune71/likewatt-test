export interface Weather {
  description: string;
  icon: string;
}

export interface MainWeather {
  temp: number;
  temp_min: number;
  temp_max: number;
}

export interface Forecast {
  dt: number;
  main: MainWeather;
  weather: Weather[];
}

export interface WeatherResponse {
  list: Forecast[];
}
