import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../config/axios-base-query';
import { SuccessResponseDto } from '../dto';
import {
  PutUpdateFlashcardRequest,
  PutUpdateFlashcardResponse,
  ReviewFlashcardParams,
} from '../dto/flashcard-dto';

export const flashcardApi = createApi({
  reducerPath: 'flashcard-api', // Unique key for the slice
  tagTypes: ['Flashcard'],
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
        url: `/review/${params.flashcard_id}/grade/${params.grade}`,
        method: 'PATCH',
      }),
    }),

    PutUpdateFlashcard: builder.mutation<
      PutUpdateFlashcardResponse,
      PutUpdateFlashcardRequest
    >({
      query: (data) => ({
        url: ``,
        method: 'PUT',
        data: data,
      }),
    }),
  }),
});

// Export hooks for the endpoints
export const { useReviewFlashMutation, usePutUpdateFlashcardMutation } =
  flashcardApi;
