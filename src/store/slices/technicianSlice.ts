import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Technician } from '../../features/technician/technician';

interface TechnicianState {
  currentTechnician: Technician | null;
}

const initialState: TechnicianState = {
  currentTechnician: null,
};

const technicianSlice = createSlice({
  name: 'technician',
  initialState,
  reducers: {
    setTechnician: (state, action: PayloadAction<Technician | null>) => {
      state.currentTechnician = action.payload;
    },
  },
});

export const {
  setTechnician,
} = technicianSlice.actions;

export default technicianSlice.reducer;
