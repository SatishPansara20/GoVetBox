import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  API_LOGIN,
  LOGIN_F,
  LOGIN_S,
  LS_AUTHTOKEN,
  LS_USER,
} from "../constants";

const initialState = {
  // Global loader for api
  isLoading: false,

  // Auth Data
  isLoggedIn: false,
  token: null,
  userData: {},
};



export const loginAction = (data) => ({
  type: "API",
  payload: {
    url: API_LOGIN,
    method: "POST",
    data: data,
    hideLoader: false,
    success: (data) => ({
      type: LOGIN_S,
      payload: data,
    }),
    error: (data) => ({
      type: LOGIN_F,
      payload: {},
    }),
  },
});

// Reducer
const loginSlice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {
    loaderChange: (state, payload) => {
      state.isLoading = payload.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(LOGIN_S, (state, action) => {
      // Default header for auth

      axios.defaults.headers.common["Authorization"] =
        action.payload.data.accessToken;

      try {
        localStorage.setItem(
          LS_AUTHTOKEN,
          JSON.stringify(action.payload.data.accessToken)
        );

        localStorage.setItem(LS_USER, JSON.stringify(action.payload.data));
      } catch (e) {
        console.error(e);
      }

      state.userData = action.payload;
      state.token = action.payload.data.accessToken;
      state.isLoggedIn = true;
    });
    builder.addCase(LOGIN_F, (state, action) => {
      // remove items on logout
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem(LS_AUTHTOKEN);
      localStorage.removeItem(LS_USER);

      state.userData = {};
      state.isLoggedIn = false;
    });
  },
});

export const { loaderChange } = loginSlice.actions;
export default loginSlice.reducer;
