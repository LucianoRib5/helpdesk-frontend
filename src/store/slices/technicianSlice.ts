import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Technician } from '../../features/technician/technician';

interface TechnicianState {
  technicians: Technician[];
  currentTechnician: Technician | null;
}

const initialState: TechnicianState = {
  technicians: [],
  currentTechnician: null,
};

const technicianSlice = createSlice({
  name: 'technician',
  initialState,
  reducers: {
    setTechnicians: (state, action: PayloadAction<Technician[]>) => {
      state.technicians = action.payload;
    },
    setTechnician: (state, action: PayloadAction<Technician | null>) => {
      state.currentTechnician = action.payload;
    },
  },
});

export const {
  setTechnicians,
  setTechnician,
} = technicianSlice.actions;

export default technicianSlice.reducer;
