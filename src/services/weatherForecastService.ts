import weatherAPI from "@/utils/weatherAPI";

export const getWeatherForecast = async (lat: string, lon: string) => {
  try {
    const response = await weatherAPI.get(
      `?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error("Erreur de récupération des prévisions météo:", error);
    throw error;
  }
};
