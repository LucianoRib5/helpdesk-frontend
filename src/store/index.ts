import { configureStore, combineReducers } from '@reduxjs/toolkit';

import authReducer from '../store/slices/authSlice';
import ticketReducer from '../store/slices/ticketSlice';
import customerReducer from '../store/slices/customerSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  ticket: ticketReducer,
  customer: customerReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
