import axios from "../utils/solarAPI";
import { Panel } from "../types/solarPanelTypes";

export const getSolarPanels = async (): Promise<Panel[]> => {
  const response = await axios.get("/");
  const panels = response.data.data;

  if (Array.isArray(panels)) {
    return panels;
  }
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return panels;
};
