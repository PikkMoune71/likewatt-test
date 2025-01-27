import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SolarPanel } from "../types/solarPanelTypes";

interface SolarPanelsState {
  data: SolarPanel[];
  loading: boolean;
}

const initialState: SolarPanelsState = { data: [], loading: false };

const solarPanelsSlice = createSlice({
  name: "solarPanels",
  initialState,
  reducers: {
    setSolarPanel(state, action: PayloadAction<SolarPanel[]>) {
      state.data = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    updateSolarPanel(state, action: PayloadAction<SolarPanel>) {
      const index = state.data.findIndex(
        (panel) => panel.id === action.payload.id
      );
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
    deleteSolarPanel(state, action: PayloadAction<string>) {
      state.data = state.data.filter((panel) => panel.id !== action.payload);
    },
  },
});

export const { setSolarPanel, setLoading, updateSolarPanel, deleteSolarPanel } =
  solarPanelsSlice.actions;
export default solarPanelsSlice.reducer;
