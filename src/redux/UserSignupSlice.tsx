import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserProps {
  email: string;
  password: string;
  passwordConfirm: string;

  error: {
    email: string;
    password: string;
    passwordConfirm: string;
    [key: string]: string;
  };
}

const initialState: UserProps = {
  email: "",
  password: "",
  passwordConfirm: "",
  error: {
    email: "",
    password: "",
    passwordConfirm: "",
  },
};

const slices = createSlice({
  name: "signup",
  initialState: initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
      state.error.email = "";
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
      state.error.password = "";
    },

    setPasswordConfirm: (state, action: PayloadAction<string>) => {
      state.passwordConfirm = action.payload;
      state.error.passwordConfirm = "";
    },
    setValideError: (
      state,
      action: PayloadAction<{ field: string; message: string }>
    ) => {
      const { field, message } = action.payload;
      state.error[field] = message;
    },
  },
});

export const { setEmail, setPassword, setValideError, setPasswordConfirm } =
  slices.actions;
export default slices.reducer;
