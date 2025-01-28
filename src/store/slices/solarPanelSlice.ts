import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SolarPanel } from "../../types/solarPanelTypes";
import { fetchSolarPanels } from "../actions/solarPanelsAction";

interface SolarPanelsState {
  data: SolarPanel[];
  loading: boolean;
  error: string | null;
}

const initialState: SolarPanelsState = {
  data: [],
  loading: false,
  error: null,
};

const solarPanelsSlice = createSlice({
  name: "solarPanels",
  initialState,
  reducers: {
    updateSolarPanel(state, action: PayloadAction<SolarPanel>) {
      const index = state.data.findIndex(
        (panel) => panel.id === action.payload.id
      );
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
    deleteSolarPanel(state, action: PayloadAction<number>) {
      state.data = state.data.filter((panel) => panel.id !== action.payload);
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSolarPanels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSolarPanels.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSolarPanels.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.error.message || "Erreur lors de la récupération des panneaux";
      });
  },
});

export const { updateSolarPanel, deleteSolarPanel, setLoading } =
  solarPanelsSlice.actions;
export default solarPanelsSlice.reducer;
