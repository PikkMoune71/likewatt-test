import { PanelList } from "../components/PanelList";
import WeatherForecast from "@/components/WeatherForecast";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <PanelList />
      <WeatherForecast />
    </div>
  );
}
