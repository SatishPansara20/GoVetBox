import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  API_LOGIN,
  LOGIN_F,
  LOGIN_S,
  API_FORGOT_PASSWORD,
  FORGOT_PASSWORD_S,
  FORGOT_PASSWORD_F,
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
  forgotPasswordData: {},
};

const loadFromLocalStorage = (data) => {
  try {
    const result = data;
    return result ? JSON.parse(result) : undefined;
  } catch (e) {
    console.error(e);
    return undefined;
  }
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

export const forgotPasswordAction = (data) => ({
  type: "API",
  payload: {
    url: API_FORGOT_PASSWORD,
    method: "POST",
    data: data,
    hideLoader: false,
    success: (data) => ({
      type: FORGOT_PASSWORD_S,
      payload: data,
    }),
    error: (data) => ({
      type: FORGOT_PASSWORD_F,
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

      try {
        localStorage.setItem(
          LS_AUTHTOKEN,
          JSON.stringify(action.payload.data.accessToken)
        );

        localStorage.setItem(LS_USER, JSON.stringify(action.payload.data));
      } catch (e) {
        console.error(e);
      }

      try {
        axios.defaults.headers.common["Authorization"] = loadFromLocalStorage(
          localStorage.getItem(LS_AUTHTOKEN)
        );
        //console.log(localStorage.getItem(LS_AUTHTOKEN));
      } catch (e) {
        console.error(e);
      }

      state.userData = action.payload;
      state.isLoggedIn = true;
      state.token = loadFromLocalStorage(localStorage.getItem(LS_AUTHTOKEN));
    });
    builder.addCase(LOGIN_F, (state, action) => {
      // remove items on logout
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem(LS_AUTHTOKEN);
      localStorage.removeItem(LS_USER);

      state.userData = {};
      state.isLoggedIn = false;
    });

    builder.addCase(FORGOT_PASSWORD_S, (state, action) => {
      state.forgotPasswordData = action.payload;
    });
    builder.addCase(FORGOT_PASSWORD_F, (state, action) => {
      state.forgotPasswordData = {};
    });
  },
});

export const forgotPasswordData = (state) => state.auth.forgotPasswordData;
export const isLoading = (state) => state.auth.isLoading;

export const { loaderChange } = loginSlice.actions;

export default loginSlice.reducer;
