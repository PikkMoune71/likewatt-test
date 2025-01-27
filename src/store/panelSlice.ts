import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Panel } from "../types/Panel";

interface PanelsState {
  data: Panel[];
  loading: boolean;
}

const initialState: PanelsState = { data: [], loading: false };

const panelsSlice = createSlice({
  name: "panels",
  initialState,
  reducers: {
    setPanels(state, action: PayloadAction<Panel[]>) {
      state.data = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    updatePanel(state, action: PayloadAction<Panel>) {
      const index = state.data.findIndex(
        (panel) => panel.id === action.payload.id
      );
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
    deletePanel(state, action: PayloadAction<string>) {
      state.data = state.data.filter((panel) => panel.id !== action.payload);
    },
  },
});

export const { setPanels, setLoading, updatePanel, deletePanel } =
  panelsSlice.actions;
export default panelsSlice.reducer;
