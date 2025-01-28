import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/solarAPI";
import { SolarPanel } from "../../types/solarPanelTypes";
import { getSolarPanels } from "@/services/solarPanelsService";

export const fetchSolarPanels = createAsyncThunk<SolarPanel[]>(
  "solarPanels/fetchSolarPanels",
  async () => {
    const panels = await getSolarPanels();
    return panels;
  }
);
