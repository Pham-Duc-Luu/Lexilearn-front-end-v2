import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../config/axios-base-query';
import {
  PatchUserProfileRequestDto,
  SuccessResponseDto,
  UserProfileMetadata,
} from '../dto/user-dto';

export const userApi = createApi({
  reducerPath: 'user-api', // Unique key for the slice
  tagTypes: [''],
  baseQuery: axiosBaseQuery({
    baseUrl:
      (import.meta.env.VITE_PUBLIC_API_BASE_URL || 'localhost') +
      '/user/api/v1',
  }), // Use the Axios base query
  endpoints: (builder) => ({
    profile: builder.query<SuccessResponseDto<UserProfileMetadata>, null>({
      query: () => ({
        url: '/user/profile',
        method: 'GET',
      }),
    }),
    editProfile: builder.mutation<
      SuccessResponseDto<UserProfileMetadata>,
      PatchUserProfileRequestDto
    >({
      query: (data) => ({
        url: '/user/profile',
        method: 'PATCH',
        data,
      }),
    }),
  }),
});

// Export hooks for the endpoints
export const { useProfileQuery } = userApi;
