import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Customer } from '../../features/customer/customerTypes';

interface CustomerState {
  customers: Customer[];
  currentCustomer: Customer | null;
}

const initialState: CustomerState = {
  customers: [],
  currentCustomer: null,
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setCustomers: (state, action: PayloadAction<Customer[]>) => {
      state.customers = action.payload;
    },
    addCustomer: (state, action: PayloadAction<Customer>) => {
      state.customers.push(action.payload);
    },
    updateCustomer: (state, action: PayloadAction<Customer>) => {
      const index = state.customers.findIndex(customer => customer.id === action.payload.id);
      if (index !== -1) {
        state.customers[index] = action.payload;
      }
    },
    deleteCustomer: (state, action: PayloadAction<number>) => {
      state.customers = state.customers.filter(customer => customer.id !== action.payload);
    },
    setCurrentCustomer: (state, action: PayloadAction<Customer | null>) => {
      state.currentCustomer = action.payload;
    },
  },
});

export const { 
  setCustomers, 
  addCustomer, 
  updateCustomer, 
  deleteCustomer,
  setCurrentCustomer
} = customerSlice.actions;

export default customerSlice.reducer;
