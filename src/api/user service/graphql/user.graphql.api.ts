import {
  api as generatedApi,
  SearchDesksDocument,
  SearchDesksQuery,
  SearchDesksQueryVariables,
} from './types.generated';

export const userGQLApi = generatedApi
  .enhanceEndpoints({
    addTagTypes: ['Desks', 'Desk'],
    endpoints: {
      GetUserDesks: {
        providesTags: ['Desk'],
      },
    },
  })
  .injectEndpoints({
    endpoints: (build) => ({
      SearchDesksInfinite: build.infiniteQuery<
        SearchDesksQuery,
        SearchDesksQueryVariables,
        number
      >({
        infiniteQueryOptions: {
          // Must provide a default initial page param value
          initialPageParam: 1, // Must provide a `getNextPageParam` function
          getNextPageParam: (
            lastPage,
            allPages,
            lastPageParam,
            allPageParams
          ) => lastPageParam + 1,
        },
        query: (variables) => {
          if (variables.queryArg) {
            variables.queryArg = {
              ...variables.queryArg,
              skip:
                (variables?.queryArg?.limit ? variables?.queryArg?.limit : 30) *
                (variables.pageParam - 1),
            };
          }
          return {
            document: SearchDesksDocument,
            variables: variables.queryArg,
          };
        },
      }),
    }),
  });

export const { useGetUserDesksQuery, useSearchDesksInfiniteInfiniteQuery } =
  userGQLApi;
