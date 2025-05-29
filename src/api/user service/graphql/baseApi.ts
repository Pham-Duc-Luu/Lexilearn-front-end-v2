import { fetchNewToken } from '@/api/config/axios-base-query';
import { GraphqlErrorResponse } from '@/api/dto/graphql-dto';
import { setAccessToken, setIsLogin } from '@/redux/store/Auth.proto.slice';
import { RootState } from '@/redux/store/ProtoStore.slice';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';
import { AxiosError } from 'axios';
import { GraphQLClient } from 'graphql-request';

// export const graphqlApi = createApi({
//     reducerPath: "api/graphql",
//     baseQuery: axiosBaseQuery({
//         baseUrl:
//             (import.meta.env.VITE_PUBLIC_API_BASE_URL || "localhost") +
//             "/user/graphql",
//     }),
//     endpoints: () => ({}),
// });

const HEADER_TYPE_APPLICATION_FORM = 'application/x-www-form-urlencoded';

export const client = new GraphQLClient(
  (import.meta.env.VITE_PUBLIC_API_BASE_URL || 'localhost') + '/graphql'
);

const graphqlBaseQuery = graphqlRequestBaseQuery({
  client,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.persistedReducer.auth.access_token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

export const baseQueryWithReauthGraphql: BaseQueryFn = async (
  { document, variables },
  api,
  extraOptions
) => {
  let result = await graphqlBaseQuery(
    { document, variables },
    api,
    extraOptions
  );

  const { getState, dispatch } = api;

  const { meta } = result as any;

  if (meta?.response?.errors) {
    const errors = meta.response?.errors as GraphqlErrorResponse[];
    for (let index = 0; index < errors.length; index++) {
      if (errors[index]?.extensions?.debugInfo?.errorDetails?.status === 401) {
        try {
          const refreshResult = await fetchNewToken();
          if (refreshResult.data.access_token) {
            // store the new token
            dispatch(setAccessToken(refreshResult.data.access_token));
            dispatch(setIsLogin(true));

            result = await graphqlBaseQuery(
              { document, variables },
              api,
              extraOptions
            );

            return { data: result.data };
          } else {
            dispatch(setIsLogin(false));
            throw new AxiosError('Something went wrong!');
          }
        } catch (error) {
          dispatch(setIsLogin(false));
          const err = error as AxiosError;
          return {
            error: {
              status: err.response?.status,
              data: err.response?.data || err.message,
            },
          };
        }
      }

      break;
    }
  }
  return result;
};

export const baseApiWithGraphql = createApi({
  baseQuery: baseQueryWithReauthGraphql,
  reducerPath: 'api/user/graphql',
  endpoints: () => ({}),
  tagTypes: [],
});
