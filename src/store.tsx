import userSlice from "./redux/UserSignupSlice";
import { configureStore } from "@reduxjs/toolkit";
export const store = configureStore({
  reducer: {
    signUp: userSlice,
  },
});
