import { getWeatherForecast } from "../services/weatherForecastService";
import weatherAPI from "../utils/weatherAPI";
import { expect } from "@jest/globals";

jest.mock("../utils/weatherAPI");

describe("getWeatherForecast", () => {
  it("devrait retourner les prévisions météorologiques pour les coordonnées données", async () => {
    const mockWeatherData = {
      temperature: 22,
      description: "Ensoleillé",
    };

    (weatherAPI.get as jest.Mock).mockResolvedValue({ data: mockWeatherData });

    const lat = "48.8566";
    const lon = "2.3522";
    const weather = await getWeatherForecast(lat, lon);

    expect(weatherAPI.get).toHaveBeenCalledWith(
      `?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
    );
    expect(weather).toEqual(mockWeatherData);
  });

  it("devrait lever une erreur en cas de problème d'API", async () => {
    const mockError = new Error("Erreur réseau");
    (weatherAPI.get as jest.Mock).mockRejectedValue(mockError);

    await expect(getWeatherForecast("48.8566", "2.3522")).rejects.toThrow(
      "Erreur réseau"
    );
    expect(weatherAPI.get).toHaveBeenCalledWith(
      "?lat=48.8566&lon=2.3522&units=metric&lang=fr&appid=undefined"
    );
  });
});
