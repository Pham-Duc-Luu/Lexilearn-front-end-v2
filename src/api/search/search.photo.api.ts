import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../config/axios-base-query';

import { SearchImageResponse } from '../dto/photo-dto';

interface SearchImageParams {
  q: string;
  limit: number;
  skip: number;
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
    searchPhotos: builder.query<SearchImageResponse, SearchImageParams>({
      query: (body) => {
        const urlParams = new URLSearchParams({ ...body });
        return {
          url: `/search?${urlParams.toString()}`,
          body: body,
          method: 'GET',
        };
      },
      transformResponse: (response: SearchImageResponse) => {
        return {
          ...response,
          metadata: response.metadata.map((item) => {
            if (
              item?.url?.includes('images.unsplash.com') &&
              !item?.url?.includes('w=720')
            ) {
              const url = new URL(item.url);
              const searchParams = new URLSearchParams(url.search);
              searchParams.set('w', '720');
              url.search = searchParams.toString();
              item.url = url.toString();
            }
            return { ...item };
          }),
        };
      },
    }),
  }),
});

// Export hooks for the endpoints
export const { useLazySearchPhotosQuery, useSearchPhotosQuery } =
  searchPhotoApi;
