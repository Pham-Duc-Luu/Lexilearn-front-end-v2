import { createApi } from '@reduxjs/toolkit/query/react';
import qs from 'qs';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';
import { GraphQLClient } from 'graphql-request';
import { Mutex } from 'async-mutex';
import { RootState } from '@/redux/store/ProtoStore.slice';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { GraphqlErrorResponse } from '@/api/dto/graphql-dto';
import Cookies from 'js-cookie';
import axios, { AxiosError } from 'axios';
import { AuthResponseDto } from '@/api/dto';
import {
  setAccessToken,
  setIsAuthenticatedError,
} from '@/redux/store/Auth.proto.slice';

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
  (import.meta.env.VITE_PUBLIC_API_BASE_URL || 'localhost') + '/user/graphql'
);

const mutex = new Mutex();

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
  await mutex.waitForUnlock();
  let result;
  try {
    result = await graphqlBaseQuery({ document, variables }, api, extraOptions);

    const { meta } = result as any;
    let error;

    if (meta?.response?.errors) {
      const errors = meta.response?.errors as GraphqlErrorResponse[];
      errors.length > 0 &&
        errors.forEach(async (e) => {
          // Intercept HTTP 401 responses and do the refresh token call
          if (
            e?.extensions?.debugInfo?.errorDetails?.status &&
            e.extensions.debugInfo.errorDetails.status === 401
          ) {
            console.log(e);
            // Even if multiple apis fail simultaneously with 401
            // only allow one api call to refresh the token
            if (!mutex.isLocked()) {
              const release = await mutex.acquire();
              try {
                const { access_token } = (api.getState() as RootState)
                  .persistedReducer.auth;
                // Use the proper refresh token request format here
                const headers = {
                  'x-api-key':
                    import.meta.env.VITE_PUBLIC_API_KEY || 'default-api-key',
                };

                try {
                  const refreshResult = await axios<AuthResponseDto>({
                    url:
                      import.meta.env.VITE_PUBLIC_API_BASE_URL +
                      '/user/api/v1/auth/refresh-token',
                    withCredentials: true,
                    method: 'POST',
                    data: {
                      refresh_token: Cookies.get('refresh_token'),
                      access_token: access_token,
                    },
                    headers: {
                      ...headers,
                      Authorization: access_token
                        ? `Bearer ${access_token}`
                        : '', // Add token here
                    },
                  });

                  // TODO : Dispatch the updated token information
                  // store the new token
                  api?.dispatch(
                    setAccessToken(refreshResult.data.access_token)
                  );
                  // Once the tokens are updated, do the failed api call again
                  result = await graphqlBaseQuery(
                    { document, variables },
                    api,
                    extraOptions
                  );
                } catch (error) {
                  const err = error as AxiosError;
                  console.log(err);

                  if (err.status === 401) {
                    console.log(err);
                    api.dispatch(setIsAuthenticatedError(true));
                  }
                  error = {
                    status: err.response?.status,
                    data: err.response?.data || err.message,
                  };
                }
              } finally {
                release();
              }
            } else {
              await mutex.waitForUnlock();
              result = await graphqlBaseQuery(
                { document, variables },
                api,
                extraOptions
              );
            }
          }
        });
    }

    if (error) {
      return error;
    }

    return result;
  } catch (e: any) {
    // Intercept HTTP 401 responses and do the refresh token call
    if (e && e.response && e.response.status === 401) {
      // Even if multiple apis fail simultaneously with 401
      // only allow one api call to refresh the token
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();
        try {
          const { refresh_token, access_token } = (api.getState() as RootState)
            .persistedReducer.auth;
          // Use the proper refresh token request format here
          const refreshResult = await authBaseQuery(
            {
              url: '/user/api/v1/auth/refresh-token',
              method: 'GET',
              body: qs.stringify({ refresh_token, access_token }),
              headers: { 'Content-Type': HEADER_TYPE_APPLICATION_FORM },
            },
            api,
            extraOptions
          );

          if (refreshResult.data) {
            // TODO : Dispatch the updated token information
            // api.dispatch(updateToken(refreshResult.data))

            // Once the tokens are updated, do the failed api call again
            result = await graphqlBaseQuery(
              { document, variables },
              api,
              extraOptions
            );
          } else {
            // TODO : Dispatch an error if the refresh token call threw an error
            // api.dispatch(updateRefreshTokenError(true))
          }
        } finally {
          release();
        }
      } else {
        await mutex.waitForUnlock();
        result = await graphqlBaseQuery(
          { document, variables },
          api,
          extraOptions
        );
      }
      return result;
    }
  }
};

export const baseApiWithGraphql = createApi({
  baseQuery: baseQueryWithReauthGraphql,
  reducerPath: 'api/user/graphql',
  endpoints: () => ({}),
  tagTypes: [],
});
