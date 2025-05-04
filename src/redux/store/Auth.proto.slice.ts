import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface IAuthState {
    access_token?: string;
    refresh_token?: string;
    isLogin: boolean;
    isAuthenticatedError?: boolean;
}

const initAuthState: IAuthState = {
    isLogin: false
};

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
        setIsLogin: (state, action: PayloadAction<boolean>) => {
            state.isLogin = action.payload
        }
    },
});

export const {
    setAccessToken,
    setRefreshToken,
    loggedOut,
    setIsAuthenticatedError,
    setIsLogin
} = authSlice.actions;

export default authSlice.reducer;
