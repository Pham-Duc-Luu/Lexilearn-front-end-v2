import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../config/axios-base-query';
import { SuccessResponseDto } from '../dto';
import { ReviewFlashcardParams } from '../dto/flashcard-dto';

export const flashcardApi = createApi({
  reducerPath: 'desk-api', // Unique key for the slice
  tagTypes: ['Desk'],
  baseQuery: axiosBaseQuery({
    baseUrl:
      (import.meta.env.VITE_PUBLIC_API_BASE_URL || 'localhost') +
      '/user/api/v1/flashcard',
  }), // Use the Axios base query
  endpoints: (builder) => ({
    reviewFlash: builder.mutation<
      SuccessResponseDto<string>,
      ReviewFlashcardParams
    >({
      query: (params) => ({
        url: `/reviews/${params.flashcard_id}/grade/${params.grade}`,
        method: 'GET',
      }),
    }),
  }),
});

// Export hooks for the endpoints
export const { useReviewFlashMutation } = flashcardApi;
