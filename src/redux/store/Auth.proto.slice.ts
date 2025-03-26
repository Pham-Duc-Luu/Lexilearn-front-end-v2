import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface IAuthState {
  access_token?: string;
  refresh_token?: string;
  isAuthenticatedError?: boolean;
}

const initAuthState: IAuthState = {};

export const authSlice = createSlice({
  initialState: initAuthState,
  name: 'auth',
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.access_token = action.payload;
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refresh_token = action.payload;
    },
    setIsAuthenticatedError: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticatedError = action.payload;
    },
    loggedOut: (state) => {
      state.access_token = undefined;
      state.refresh_token = undefined;
    },
  },
});

export const {
  setAccessToken,
  setRefreshToken,
  loggedOut,
  setIsAuthenticatedError,
} = authSlice.actions;

export default authSlice.reducer;
