// store/api/authApi.ts
import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../config/axios-base-query';
import {
  AuthResponseDto,
  ErrorResponseDto,
  GoogleTokenRequestDto,
  ResetPasswordResquestDto,
  SignInRequestDto,
  SignUpRequestDto,
} from '../dto';
import { authenticationInstance } from '../config/axios';
import Cookies from 'js-cookie';
import { AxiosError, AxiosResponse } from 'axios';
import {
  setAccessToken,
  setIsAuthenticatedError,
} from '@/redux/store/Auth.proto.slice';
// Define an API slice
export const authApi = createApi({
  reducerPath: 'authApi', // Unique key for the slice
  baseQuery: axiosBaseQuery({
    baseUrl:
      (import.meta.env.VITE_PUBLIC_API_BASE_URL || 'localhost') +
      '/user/api/v1/auth',
  }), // Use the Axios base query

  endpoints: (builder) => ({
    // Define a login endpoint
    signIn: builder.mutation<AuthResponseDto, SignInRequestDto>({
      // query: (credentials) => ({
      //   url: "/sign-in",
      //   method: "POST",
      //   data: credentials,
      // }),
      queryFn: async (arg, queryApi) => {
        try {
          const res = await authenticationInstance.post<AuthResponseDto>(
            '/sign-in',
            { ...arg }
          );

          const { dispatch } = queryApi;

          dispatch(setAccessToken(res.data.access_token));
          dispatch(setIsAuthenticatedError(false));
          Cookies.set('refresh_token', res.data.refresh_token, {
            expires: 7,
            secure: true,
            sameSite: 'Strict',
          });

          return { data: res.data };
        } catch (error) {
          if (error instanceof AxiosError) {
            return {
              error: {
                status: error.response?.status,
                data: error.response?.data,
              },
            };
          }
          return {
            error: {
              status: 500,
              statusText: 'Internal Server Error',
              data: 'Invalid ID provided.',
            },
          };
        }
      },
    }),
    signUp: builder.mutation<AuthResponseDto, SignUpRequestDto>({
      // query: (credentials) => ({
      //   url: "/sign-up",
      //   method: "POST",
      //   data: credentials,
      // }),
      queryFn: async (arg, queryApi) => {
        try {
          const res = await authenticationInstance.post<AuthResponseDto>(
            '/sign-up',
            { ...arg }
          );

          const { dispatch } = queryApi;

          // * save access toke to the local storage in redux
          dispatch(setAccessToken(res.data.access_token));
          dispatch(setIsAuthenticatedError(false));

          // IMPORTANT : save refresh token in cookie
          Cookies.set('refresh_token', res.data.refresh_token, {
            expires: 7,
            secure: true,
            sameSite: 'Strict',
          });

          return { data: res.data };
        } catch (error) {
          if (error instanceof AxiosError) {
            const data = error.response as AxiosResponse<ErrorResponseDto>;
            return {
              error: {
                status: error.response?.status,
                data: data.data.message,
              },
            };
          }
          return {
            error: {
              status: 500,
              statusText: 'Internal Server Error',
              data: 'Internal Server Error',
            },
          };
        }
      },
    }),
    sendOtp: builder.mutation<string, string>({
      // query: (credentials) => ({
      //   url: "/reset-password/send-otp",
      //   method: "POST",
      //   data: credentials,
      // }),
      queryFn: async (arg) => {
        try {
          const res = await authenticationInstance.post<string>(
            '/reset-password/send-otp-to-email',
            { email: arg }
          );

          return { data: 'Opt sent' };
        } catch (error) {
          if (error instanceof AxiosError) {
            const data = error.response as AxiosResponse<ErrorResponseDto>;
            return {
              error: {
                status: error.response?.status,
                data: data.data.message,
              },
            };
          }
          return {
            error: {
              status: 500,
              statusText: 'Internal Server Error',
              data: 'Internal Server Error',
            },
          };
        }
      },
    }),
    resetPassword: builder.mutation<string, ResetPasswordResquestDto>({
      queryFn: async (arg, queryApi, extraOptions, baseQuery) => {
        try {
          const res = await authenticationInstance.post<string>(
            '/reset-password/verify-otp-and-change-password',
            { ...arg }
          );

          return { data: 'Password reseted!' };
        } catch (error) {
          if (error instanceof AxiosError) {
            const data = error.response as AxiosResponse<ErrorResponseDto>;
            return {
              error: {
                status: error.response?.status,
                data: data.data.message,
              },
            };
          }
          return {
            error: {
              status: 500,
              statusText: 'Internal Server Error',
              data: 'Internal Server Error',
            },
          };
        }
      },
    }),
    GoogleOAuth2: builder.mutation<AuthResponseDto, string>({
      // query: (token) => ({
      //   url: "/auth/google/verify",
      //   method: "POST",
      //   data: { token },
      // }),
      queryFn: async (arg, queryApi) => {
        try {
          const requestBody: GoogleTokenRequestDto = { token: arg };
          const res = await authenticationInstance.post<AuthResponseDto>(
            '/google/verify',
            requestBody
          );

          const { dispatch } = queryApi;

          // * save access toke to the local storage in redux
          dispatch(setAccessToken(res.data.access_token));
          dispatch(setIsAuthenticatedError(false));

          // IMPORTANT : save refresh token in cookie
          Cookies.set('refresh_token', res.data.refresh_token, {
            expires: 7,
            secure: true,
            sameSite: 'Strict',
          });

          return { data: res.data };
        } catch (error) {
          if (error instanceof AxiosError) {
            const data = error.response as AxiosResponse<ErrorResponseDto>;
            return {
              error: {
                status: error.response?.status,
                data: data.data.message,
              },
            };
          }
          return {
            error: {
              status: 500,
              statusText: 'Internal Server Error',
              data: 'Internal Server Error',
            },
          };
        }
      },
    }),
  }),
});

// Export hooks for the endpoints
export const {
  useSignInMutation,
  useSignUpMutation,
  useGoogleOAuth2Mutation,
  useResetPasswordMutation,
  useSendOtpMutation,
} = authApi;
