import { setAccessToken } from '@/redux/store/Auth.proto.slice';
import { RootState } from '@/redux/store/ProtoStore.slice';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { AuthResponseDto } from '../dto';
import Cookies from 'js-cookie';

export interface RTKqueryError<T = any> {
  status: number;
  data: T;
}

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
  ): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
      headers?: AxiosRequestConfig['headers'];
    },
    any,
    {
      status?: number;
      data?: string | any;
    }
  > =>
  async ({ url, method, data, params, headers }, { getState, dispatch }) => {
    headers = {
      ...headers,
      'x-api-key': import.meta.env.VITE_PUBLIC_API_KEY || 'default-api-key',
    };
    const getToken = () => {
      const { persistedReducer } = getState() as RootState;
      return {
        access_token: persistedReducer.auth.access_token,
        refresh_token: persistedReducer.auth.refresh_token,
      };
    };

    const fetchNewToken = async () => {
      return await axios<AuthResponseDto>({
        url:
          (import.meta.env.VITE_PUBLIC_API_BASE_URL || 'localhost') +
          '/user/api/v1' +
          '/auth/refresh-token',
        withCredentials: true,
        method: 'POST',
        data: {
          refresh_token: Cookies.get('refresh_token'),
          access_token: getToken().access_token,
        },
        headers: {
          ...headers,
          Authorization: getToken().access_token
            ? `Bearer ${getToken().access_token}`
            : '', // Add token here
        },
      });
    };

    const mainFetch = () => {
      return axios<string>({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: {
          ...headers,

          Authorization: getToken().access_token
            ? `Bearer ${getToken().access_token}`
            : '', // Add token here
        },
      });
    };

    try {
      const result = await mainFetch();

      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;

      /**
       * auto fetch the access token
       */

      if (err && err.status === 401) {
        // try to get a new token
        try {
          const refreshResult = await fetchNewToken();
          if (refreshResult.data.access_token) {
            // store the new token
            dispatch(setAccessToken(refreshResult.data.access_token));

            const result = await mainFetch();

            return { data: result.data };
          } else {
            throw new AxiosError('Something went wrong!');
          }
        } catch (error) {
          // dispatch(loggedOut());
          const err = error as AxiosError;
          return {
            error: {
              status: err.response?.status,
              data: err.response?.data || err.message,
            },
          };
        }
      } else {
        return {
          error: {
            status: err.response?.status,
            data: err.response?.data || err.message,
          },
        };
      }
    }
  };

export const userServiceApiBaseQuery = axiosBaseQuery({
  baseUrl:
    (import.meta.env.VITE_PUBLIC_API_BASE_URL || 'localhost') + '/user/api/v1',
}); // Use the Axios base query

export default axiosBaseQuery;
