// export const routeState = {
//   DASHBOARD_ROUTE: () => '/dashboard/v2',
//   COLLECTION_DETAILS: (id: string) => `/collection/${id}`,
//   COLLECTION_FINISH: (id: string) => `/collection/${id}/finish`,
//   COLLECTION_LEARN: (id: string) => `/collection/${id}/learn`,
//   COLLECTION_CREATE: () => `/create/collection`,
//   COLLECTION_EDIT: (id: string) => `/edit/collection/${id}`,
//   SETTING: () => `/setting`,
//   AUTH_SIGN_IN: () => `/auth/sign-in`,
//   AUTH_SIGN_UP: () => `/auth/sign-up/v2`,
//   AUTH_FORGOTPASSWORD: () => `/auth/forgot-password`,
// };

export interface URLParameterType {
  status: LibraryRouteStatusType;
  page: string;
}

export type LibraryRouteStatusType = 'all' | 'drafted' | 'published' | 'bin';

export const routeProto = {
  HOME: () => `/home`,
  AUTH: () => `/auth`,
  CREATE_NEW_DESK: () => `/new-desk-vocab`,
  REVIEW_DESK_FLASHCARD: (deskId: string = ':deskId') =>
    `/review/desk/${deskId}/flashcard`,
  LIBRARY: (status: LibraryRouteStatusType = 'all', page: number = 1) =>
    `/home/library/${status}/${page}`,
  DESK: (deskId: string = ':deskId') => `/home/desk/${deskId}`,
  PROFILE: (profileId?: string) =>
    profileId && profileId.length > 0
      ? `/home/profile${profileId}`
      : `/home/profile`,
  EDIT_DESK_PAGE: (deskId: string = ':deskId') => `/edit-desk/${deskId}`,
};

// export const {
//   DASHBOARD_ROUTE,
//   COLLECTION_DETAILS,
//   COLLECTION_FINISH,
//   COLLECTION_LEARN,
//   COLLECTION_CREATE,
//   COLLECTION_EDIT,
//   SETTING,
//   AUTH_SIGN_IN,
//   AUTH_FORGOTPASSWORD,
//   AUTH_SIGN_UP,
// } = routeState;
