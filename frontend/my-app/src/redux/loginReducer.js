import { createSlice } from "@reduxjs/toolkit";
import postLogin from "../loginNetworkLayer.js";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    email: "",
    password: "",
    hasError: false,
    canLogin: false,
    alreadyLoggedIn: false,
  },
  reducers: {
    setError: (state, action) => {
      state.hasError = action.payload;
    },
    setCanLogin: (state, action) => {
      async (event) => {
        event.preventDefault(); 
        postLogin(email, password);
    }},
    setAlreadyLoggedIn: (state, action) => {
      state.alreadyLoggedIn = action.payload;
    },
  },
});
const { setError, setCanLogin, setAlreadyLoggedIn } = loginSlice.actions;
export default loginSlice.reducer;