import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User, UserBasicInfo } from '../../features/user/userTypes';
import { clearToken } from '../../utils/token';

interface AuthState {
  user: UserBasicInfo | null;
  users: User[];
}

const initialState: AuthState = {
  user: null,
  users: [],
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
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
});

export const { setUser, logout, setUsers } = authSlice.actions;
export default authSlice.reducer;
