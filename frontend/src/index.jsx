import { ColorModeScript } from "@chakra-ui/react";
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import EditProfilePage from "./pages/EditProfilePage";
// import FriendPage from "./pages/FriendPage";
import ExplorePage from "./pages/ExplorePage";
import AdminPage from "./pages/AdminPage";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  // <StrictMode>
  <>
    <ColorModeScript />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/u/:id" element={<ProfilePage />} />
        <Route path="/u/:id/edit" element={<EditProfilePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  </>
  //</StrictMode>
);
