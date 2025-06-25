import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../config/axios-base-query';
import {
  AmericanVoice,
  BritishVoice,
  JapaneseVoice,
  MandarinVoice,
  SubscribeRequest,
  UserTTSSubscription,
  VoiceOptions,
} from '../dto/audio-generator.dto';

export interface generateAudioQuery {
  text: string;
  voice: AmericanVoice | BritishVoice | JapaneseVoice | MandarinVoice;
}

export interface generateAudioQueryV2 {
  voice_id: string;
  text: string;
  output_format?: 'mp3';
}

export const generatorApi = createApi({
  reducerPath: 'generator-api', // Unique key for the slice
  tagTypes: [''],
  baseQuery: axiosBaseQuery({
    baseUrl:
      (import.meta.env.VITE_PUBLIC_API_BASE_URL || 'localhost') +
      '/generator-api',
  }), // Use the Axios base query
  endpoints: (builder) => ({
    generateAudio: builder.query<Blob, generateAudioQueryV2>({
      query: ({ text, voice_id, output_format = 'mp3' }) => {
        return {
          url: `/api/v1/generate/audio/v2`,
          method: 'POST',
          data: {
            text,
            voice_id,
            output_format,
          },
          responseType: 'blob',
        };
      },
    }),

    getAvailableVoices: builder.query<VoiceOptions[], null>({
      query: () => {
        return {
          url: `/api/v1/generate/audio/v2/get-voices`,
          method: 'GET',
        };
      },
    }),

    subscribe: builder.mutation<UserTTSSubscription, SubscribeRequest>({
      query: ({ subscription_plan }) => {
        return {
          url: `/subscription`,
          method: 'POST',
          data: { subscription_plan: 'basic' },
        };
      },
    }),

    getUserSubscription: builder.query<UserTTSSubscription, null>({
      query: () => {
        return {
          url: `/api/v1/subscription`,
          method: 'GET',
        };
      },
    }),
  }),
});

// Export hooks for the endpoints
export const {
  useGenerateAudioQuery,
  useLazyGenerateAudioQuery,
  useGetUserSubscriptionQuery,
  useSubscribeMutation,
  useGetAvailableVoicesQuery,
} = generatorApi;
