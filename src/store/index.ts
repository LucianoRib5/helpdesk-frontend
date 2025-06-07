import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { resetState } from './slices/actions/resetActions'
import authReducer from './slices/authSlice'
import ticketReducer from './slices/ticketSlice'
import customerReducer from './slices/customerSlice'
import technicianReducer from './slices/technicianSlice'

const appReducer = combineReducers({
  auth: authReducer,
  ticket: ticketReducer,
  customer: customerReducer,
  technician: technicianReducer,
})

const rootReducer = (state: ReturnType<typeof appReducer> | undefined, action: any) => {
  if (resetState.match(action)) {
    state = undefined
  }

  return appReducer(state, action)
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
