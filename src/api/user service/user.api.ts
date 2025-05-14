import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../config/axios-base-query';
import { ImageDto } from '../dto/photo-dto';
import {
  PatchUserProfileRequestDto,
  SuccessResponseDto,
  UserProfileMetadata,
} from '../dto/user-dto';
import { IUploadImage } from '../image service/user-image.api';

export const userApi = createApi({
  reducerPath: 'user-api', // Unique key for the slice
  tagTypes: ['user-profile'],
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
    uploadAvatar: builder.mutation<SuccessResponseDto<ImageDto>, IUploadImage>({
      query: ({ image_size, image_type, body }) => {
        const urlParams = new URLSearchParams({ 'image-size': image_size! });
        return {
          url: `/user/profile/avatar`,
          method: 'POST',
          data: body,
        };
      },
      invalidatesTags: ['user-profile'],
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
export const { useProfileQuery, useUploadAvatarMutation } = userApi;
