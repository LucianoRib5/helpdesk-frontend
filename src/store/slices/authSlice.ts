import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { UserBasicInfo } from '../../features/user/userTypes';
import { clearToken } from '../../utils/token';

interface AuthState {
  user: UserBasicInfo | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserBasicInfo>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      clearToken();
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
