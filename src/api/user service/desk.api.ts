import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../config/axios-base-query';
import { ICreateDesRequestDto, ICreateDeskResponseDto } from '../dto';
import { SuccessResponseDto } from '../dto/user-dto';

export const deskApi = createApi({
  reducerPath: 'desk-api', // Unique key for the slice
  tagTypes: ['Desk'],
  baseQuery: axiosBaseQuery({
    baseUrl:
      (import.meta.env.VITE_PUBLIC_API_BASE_URL || 'localhost') +
      '/user/api/v1/desk',
  }), // Use the Axios base query
  endpoints: (builder) => ({
    createNewDesk: builder.mutation<
      SuccessResponseDto<ICreateDeskResponseDto>,
      ICreateDesRequestDto
    >({
      query: (data) => ({
        url: '',
        method: 'POST',
        data: data,
      }),
    }),
    deleteDesk: builder.mutation<SuccessResponseDto<string>, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Desk'],
    }),
  }),
});

// Export hooks for the endpoints
export const { useCreateNewDeskMutation, useDeleteDeskMutation } = deskApi;
