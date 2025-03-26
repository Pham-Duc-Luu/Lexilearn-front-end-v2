import { userGQLApi } from '@/api/user service/graphql/user.graphql.api';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistStore,
} from 'redux-persist';
// Or from '@reduxjs/toolkit/query/react'
import localStorage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import AuthProtoReducer from './Auth.proto.slice';
import CardNodeProtoReducer from './CardNode.proto.slice';
import DeskProtoReducer from './Desk.proto.slice';
import EditDeskReducer from './editDesk.slice';
import HomepgeProtoReducer from './HomePage.proto.slice';
import LibraryProtoReducer from './LibraryStore.slice';
import NewDeskProtoReducer from './newDesk.slice';
import ReviewFlashcardReducer from './ReviewFlashcard.slice';

const rootReducer = combineReducers({
  auth: AuthProtoReducer,
  CardNode: CardNodeProtoReducer,
  HomePage: HomepgeProtoReducer,
  NewDesk: NewDeskProtoReducer,
  ReviewFlashCard: ReviewFlashcardReducer,
  LibraryPage: LibraryProtoReducer,
  DeskPage: DeskProtoReducer,
  EditDeskPage: EditDeskReducer,
});

const persistConfig = {
  key: 'root',
  whitelist: ['auth'], // Specify which reducers should be persisted
  storage: localStorage, // You can use other storages like sessionStorage, AsyncStorage (for React Native), etc.
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const ProtoStore = configureStore({
  reducer: {
    persistedReducer,
    // persistedReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [userGQLApi.reducerPath]: userGQLApi.reducer,
    [searchPhotoApi.reducerPath]: searchPhotoApi.reducer,
    [userImageApi.reducerPath]: userImageApi.reducer,
    [deskApi.reducerPath]: deskApi.reducer,

    // // apiReducer,
  },
  // devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      authApi.middleware,
      userApi.middleware,
      userGQLApi.middleware,
      searchPhotoApi.middleware,
      userImageApi.middleware,
      deskApi.middleware
    ),
});

// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(ProtoStore.dispatch);

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type RootState = ReturnType<typeof ProtoStore.getState>;
export type AppDispatch = typeof ProtoStore.dispatch;
export type AppStore = typeof ProtoStore;

import { userImageApi } from '@/api/image service/user-image.api';
import { searchPhotoApi } from '@/api/search/search.photo.api';
import { deskApi, userApi } from '@/api/user service';
import { authApi } from '@/api/user service/authentication.api';
import { useDispatch, useSelector } from 'react-redux';
import { persistReducer } from 'redux-persist';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const persistor = persistStore(ProtoStore);
