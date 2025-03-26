// app/providers.tsx
'use client';
import createApolloClient from '@/api/apolloClient';
import MouseContextProvider from '@/context/mouse-context';
import { ApolloProvider } from '@apollo/client';
import { HeroUIProvider } from '@heroui/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';
import {
  persistor,
  ProtoStore,
  useAppSelector,
} from './redux/store/ProtoStore.slice';

export function ApolloCustomeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { auth } = useAppSelector((state) => state.persistedReducer);

  return (
    <ApolloProvider client={createApolloClient({ token: auth.access_token })}>
      <PersistGate loading={null} persistor={persistor}>
        <Provider store={ProtoStore}>{children}</Provider>
      </PersistGate>
    </ApolloProvider>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HelmetProvider>
      <HeroUIProvider>
        <ToastContainer autoClose={3000}></ToastContainer>
        {/* <NextThemesProvider attribute="class" defaultTheme="dark"> */}

        <PersistGate loading={null} persistor={persistor}>
          <Provider store={ProtoStore}>
            <MouseContextProvider>
              <GoogleOAuthProvider
                clientId={`${import.meta.env.VITE_PUBLIC_AUTH_GOOGLE_ID}`}>
                {children}
              </GoogleOAuthProvider>
              {/* <ApolloCustomeProvider> */}
              {/* </ApolloCustomeProvider> */}
            </MouseContextProvider>
          </Provider>
        </PersistGate>
        {/* </NextThemesProvider> */}
      </HeroUIProvider>
    </HelmetProvider>
  );
}
