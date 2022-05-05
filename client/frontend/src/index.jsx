import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyProfilePage from './pages/MyProfilePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import EditProfilePage from './pages/EditProfilePage';
import FriendPage from './pages/FriendPage';
import ExplorePage from './pages/ExplorePage';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <StrictMode>
    <ColorModeScript />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/myprofile" element={<MyProfilePage />}/>
        <Route path="/myprofile/edit" element={<EditProfilePage />} />
        <Route path="/friend" element={<FriendPage />} />
        <Route path="/explore" element={<ExplorePage />} />
      </Routes>
    </BrowserRouter>,
  </StrictMode>
);

