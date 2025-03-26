import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import './i18n/config.ts';
// import React from 'react';
// import { routeProto } from './redux/store/route.slice.ts';
import AuthPage from '@/pages/auth/index.tsx';
import './globals.css';
import MainLayout from './layout.tsx';
import AuthLayout from './pages/auth/layout.tsx';
import EditDeskVocabLayout from './pages/desk/edit-flashcard/layout.tsx';
import EditDeskVocalPage from './pages/desk/edit-flashcard/page.tsx';
import DeskPage from './pages/home/desk/[deskId]/page.tsx';
import HomePage from './pages/home/HomePage.tsx';
import HomeLayout from './pages/home/layout.tsx';
import ListBar from './pages/home/library/[status]/[page]/page.tsx';
import LibraryStatusLayout from './pages/home/library/[status]/layout.tsx';
import LibraryLayout from './pages/home/library/layout.tsx';
import ProfilePage from './pages/home/profile/page.tsx';
import NewDeskVocabLayout from './pages/new-desk-vocab/layout.tsx';
import NewDeskVocalPage from './pages/new-desk-vocab/page.tsx';
import ReviewFlashcardLayout from './pages/review/flashcard/layout.tsx';
import { Providers } from './Providers.tsx';
import { routeProto } from './redux/store/route.slice.ts';
const root = document.getElementById('root');

createRoot(root!).render(
  <StrictMode>
    <Providers>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<MainLayout></MainLayout>}>
            <Route
              path="auth"
              element={
                <AuthLayout>
                  <AuthPage></AuthPage>
                </AuthLayout>
              }
            />
            <Route path="home" element={<HomeLayout></HomeLayout>}>
              <Route index element={<HomePage></HomePage>}></Route>
              <Route path="library" element={<LibraryLayout></LibraryLayout>}>
                <Route
                  path=":status"
                  element={<LibraryStatusLayout></LibraryStatusLayout>}>
                  <Route path=":page" element={<ListBar></ListBar>}></Route>
                </Route>
              </Route>

              <Route path="desk">
                <Route path=":deskId" element={<DeskPage></DeskPage>}></Route>
              </Route>

              <Route
                path="profile"
                element={<ProfilePage></ProfilePage>}></Route>
            </Route>
            <Route
              path="new-desk-vocab"
              element={<NewDeskVocabLayout></NewDeskVocabLayout>}>
              <Route
                index
                element={<NewDeskVocalPage></NewDeskVocalPage>}></Route>
            </Route>
            <Route
              path="edit-desk/:deskId"
              element={<EditDeskVocabLayout></EditDeskVocabLayout>}>
              <Route
                index
                element={<EditDeskVocalPage></EditDeskVocalPage>}></Route>
            </Route>
            <Route
              path={routeProto.REVIEW_DESK_FLASHCARD()}
              element={<ReviewFlashcardLayout></ReviewFlashcardLayout>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Providers>
  </StrictMode>
);
