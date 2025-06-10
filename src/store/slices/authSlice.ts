import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { UserBasicInfo } from '../../features/user/userTypes';
import { clearToken } from '../../utils/token';

interface AuthState {
  user: UserBasicInfo | null;
  users: UserBasicInfo[];
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
    setUsers: (state, action: PayloadAction<UserBasicInfo[]>) => {
      state.users = action.payload;
    },
    updateUser: (state, action: PayloadAction<UserBasicInfo>) => {
      const updatedUser = action.payload;
      const index = state.users.findIndex(user => user.userId === updatedUser.userId);
      if (index !== -1) {
        state.users[index] = updatedUser;
      }
      if (state.user?.userId === updatedUser.userId) {
        state.user = updatedUser;
      }
    }
  },
});

export const { setUser, logout, setUsers, updateUser } = authSlice.actions;
export default authSlice.reducer;
