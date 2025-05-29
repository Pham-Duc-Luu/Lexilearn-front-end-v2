import { createApi } from '@reduxjs/toolkit/query/react';
import FormData from 'form-data';
import axiosBaseQuery from '../config/axios-base-query';
import { ImageDto, UserImage } from '../dto/photo-dto';

export interface IUploadImage {
  image_size?: 'FHD' | 'HD' | 'SD';
  image_type?: 'JPEG' | 'PNG';
  body: FormData;
}

interface IUploadAudio {
  body: FormData;
}

interface IQueryImage {
  file_name: string;
}

interface IGetPresignURLArgs {
  image_id?: string;
  file_name?: string;
}

export const userImageApi = createApi({
  reducerPath: 'user-image-api', // Unique key for the slice
  tagTypes: [''],
  baseQuery: axiosBaseQuery({
    baseUrl:
      (import.meta.env.VITE_PUBLIC_API_BASE_URL || 'localhost') +
      '/image/api/v1',
  }), // Use the Axios base query
  endpoints: (builder) => ({
    uploadImage: builder.mutation<ImageDto, IUploadImage>({
      query: ({ image_size, image_type, body }) => {
        const urlParams = new URLSearchParams({ 'image-size': image_size! });
        return {
          url: `/images/private/upload?${urlParams.toString()}`,
          method: 'POST',
          data: body,
        };
      },
    }),

    getPresignURL: builder.query<ImageDto, IGetPresignURLArgs>({
      query: (params) => {
        const urlParams = new URLSearchParams({ ...params });
        return {
          url: `/images/private/upload?${urlParams.toString()}`,
          method: 'GET',
        };
      },
    }),

    uploadAudio: builder.mutation<UserImage, IUploadAudio>({
      query: ({ body }) => {
        return {
          url: `/audio/private/upload`,
          method: 'POST',
          data: body,
        };
      },
    }),
  }),
});

// Export hooks for the endpoints
export const { useUploadImageMutation, useUploadAudioMutation } = userImageApi;
