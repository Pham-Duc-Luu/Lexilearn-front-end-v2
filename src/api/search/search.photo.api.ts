import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../config/axios-base-query';
import {
  PatchUserProfileRequestDto,
  SuccessResponseDto,
  UserProfileMetadata,
} from '../dto/user-dto';

import { Photo, SearchImageReponse } from '../dto/photo-dto';

interface SearchImageParames extends Record<string, string> {
  q: string;
  limit: string;
  skip: string;
}

export const searchPhotoApi = createApi({
  reducerPath: 'search-photo', // Unique key for the slice
  tagTypes: [''],
  baseQuery: axiosBaseQuery({
    baseUrl:
      (import.meta.env.VITE_PUBLIC_API_BASE_URL || 'localhost') +
      '/image/api/v1/images',
  }), // Use the Axios base query
  endpoints: (builder) => ({
    searchPhotos: builder.mutation<SearchImageReponse, Record<string, any>>({
      query: (body: SearchImageParames) => {
        const urlParams = new URLSearchParams({ ...body });

        return {
          url: `/search?${urlParams.toString()}`,
          body: body,
          method: 'GET',
        };
      },
      transformResponse: (response: SearchImageReponse) => {
        return {
          ...response,
          metadata: response.metadata.map((item) => {
            if (
              item.photo_image_url.includes('images.unsplash.com') &&
              !item.photo_image_url.includes('w=720')
            ) {
              const url = new URL(item.photo_image_url);
              const searchParams = new URLSearchParams(url.search);
              searchParams.set('w', '720');
              url.search = searchParams.toString();
              item.photo_image_url = url.toString();
            }
            return { ...item };
          }),
        };
      },
    }),
  }),
});

// Export hooks for the endpoints
export const { useSearchPhotosMutation } = searchPhotoApi;
