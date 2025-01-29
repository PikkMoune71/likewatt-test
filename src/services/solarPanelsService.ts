import axios from "../utils/solarAPI";
import { SolarPanel } from "../types/solarPanelTypes";

export const getSolarPanels = async (): Promise<SolarPanel[]> => {
  const response = await axios.get("/");
  const panels = response.data.data;

  if (Array.isArray(panels)) {
    return panels;
  }
  return panels;
};
