import { checkImageExists } from '@/utils/image';
import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../config/axios-base-query';
import { SearchImageResponse } from '../dto/photo-dto';

export interface SearchImageParams {
  q: string;
  limit?: number;
  skip?: number;
  lr?: 'lang_en' | 'lang_ko' | 'lang_zh-CN' | 'lang_ja';
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
      transformResponse: async (response: SearchImageResponse) => {
        const imageList = [];

        // * check if image can be load or not
        for (let index = 0; index < response.metadata.length; index++) {
          const image = response.metadata[index];
          if (await checkImageExists(image.url)) {
            imageList.push(image);
          }
        }

        return {
          ...response,
          metadata: imageList.map((item) => {
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
