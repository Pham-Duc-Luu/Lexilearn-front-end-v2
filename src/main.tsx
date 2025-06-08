import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
// import React from 'react';
// import { routeProto } from './redux/store/route.slice.ts';
import { StartPage } from '@/page.tsx';
import AuthPage from '@/pages/auth/index.tsx';
import './globals.css';
import MainLayout from './layout.tsx';
// import { enableMocking } from './mock/start.ts';
import AuthLayout from './pages/auth/layout.tsx';
import EditDeskVocabLayout from './pages/desk/edit-flashcard/layout.tsx';
import EditDeskVocalPage from './pages/desk/edit-flashcard/page.tsx';
import DeskPage from './pages/home/desk/[deskId]/page.tsx';
import HomePage from './pages/home/HomePage.tsx';
import HomeLayout from './pages/home/layout.tsx';
import LibraryStatusLayout from './pages/home/library/[status]/layout.tsx';
import LibraryLayout from './pages/home/library/layout.tsx';
import ProfilePage from './pages/home/profile/page.tsx';
import {
  ComponentsUrl,
  PlayGroundLayout,
} from './pages/play-ground/layout.tsx';
import ReviewFlashcardLayout from './pages/review/flashcard/layout.tsx';
import ReviewFlashcard from './pages/review/flashcard/page.tsx';
import { routeProto } from './redux/store/route.slice.ts';
const root = document.getElementById('root');

function App() {
  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<MainLayout></MainLayout>}>
            <Route index element={<StartPage></StartPage>} />
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
                  path=":status/:page"
                  element={<LibraryStatusLayout></LibraryStatusLayout>}></Route>
              </Route>

              <Route path="desk">
                <Route path=":deskId" element={<DeskPage></DeskPage>}></Route>
              </Route>

              <Route
                path="profile"
                element={<ProfilePage></ProfilePage>}></Route>
            </Route>

            {/* <Route
            path="new-desk-vocab"
            element={<NewDeskVocabLayout></NewDeskVocabLayout>}>
            <Route
              index
              element={<NewDeskVocalPage></NewDeskVocalPage>}></Route>
          </Route> */}

            <Route
              path={routeProto.EDIT_DESK_PAGE()}
              element={<EditDeskVocabLayout></EditDeskVocabLayout>}>
              <Route
                index
                element={<EditDeskVocalPage></EditDeskVocalPage>}></Route>
            </Route>

            <Route
              path={routeProto.REVIEW_DESK_FLASHCARD()}
              element={<ReviewFlashcardLayout></ReviewFlashcardLayout>}>
              <Route
                index
                element={<ReviewFlashcard></ReviewFlashcard>}></Route>
            </Route>
            <Route
              path={routeProto.COMPONENTS()}
              element={<PlayGroundLayout></PlayGroundLayout>}>
              {ComponentsUrl.map((item, index) => {
                return (
                  <Route
                    key={index}
                    path={item.url}
                    element={item.component}></Route>
                );
              })}
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
}

// enableMocking().then(() => {
createRoot(root!).render(<App />);
// });
