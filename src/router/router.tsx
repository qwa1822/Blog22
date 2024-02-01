// Router.tsx

import { Route, Routes } from "react-router-dom";
import Home from "../Page/Home/Home";
import Posts from "../Page/Posts/Posts";
import PostId from "../Page/Posts/PostDetail";
import Edit from "../Page/Posts/Edit";
import ProfilePage from "../Page/profile/ProfilePage";
import PostNew from "../Page/Posts/PostNew";
import LoginPage from "../Page/login/LoginPage";
import SignUp from "../Page/Signup/SignUp";

interface RouterProps {
  isAuthenticated: boolean;
}

export default function Router({ isAuthenticated }: RouterProps) {
  return (
    <Routes>
      {isAuthenticated ? (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<PostId />} />
          <Route path="/posts/new" element={<PostNew />} />
          <Route path="/posts/edit/:id" element={<Edit />} />
          <Route path="/profile" element={<ProfilePage />} />

          <Route path="/signup" element={<SignUp />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<LoginPage />} />
        </>
      )}
    </Routes>
  );
}
