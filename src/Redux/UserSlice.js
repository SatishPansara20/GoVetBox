import { createSlice } from "@reduxjs/toolkit";

import {
  API_LOGIN,
  USER_LIST_F,
  USER_LIST_S,
  // LS_AUTHTOKEN,
  API_DASHBOARD,
  DASHBOARD_S,
  DASHBOARD_F,
} from "../constants";
// import axios from "axios";

const initialState = {
  userList: [],
  userInfo: {},
  dashboardData: {},
};

export const getUserList = (data) => ({
  type: "API",
  payload: {
    url: API_LOGIN,
    method: "POST",
    data: data,
    hideLoader: false,
    success: (data) => ({
      type: USER_LIST_S,
      payload: data,
    }),
    error: (data) => ({
      type: USER_LIST_F,
      payload: [],
    }),
  },
});

export const getdashboardData = (data) => ({
  type: "API",
  payload: {
    url: API_DASHBOARD,
    method: "POST",
    data: data,
    hideLoader: false,
    success: (data) => ({
      type: DASHBOARD_S,
      payload: data,
    }),
    error: (data) => ({
      type: DASHBOARD_F,
      payload: {},
    }),
  },
});

// Reducer
const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(USER_LIST_S, (state, action) => {
      state.userList = action.payload.data;
    });
    builder.addCase(USER_LIST_F, (state, action) => {
      state.userList = [];
    });
    builder.addCase(DASHBOARD_S, (state, action) => {
      //console.log(action.payload)
      const response= action.payload
      if (response?.status === 200) {
        state.dashboardData = action.payload;
      }
     
    });
    builder.addCase(DASHBOARD_F, (state, action) => {
      const error = action.payload;

      if (error) {
        console.log(error);
      } else if (error.request) {
        console.log(
          `The request was made but not received proper response and The response received is  : ${error.request}`
        );
      } else {
        console.log(
          `Something happened in setting up the request that triggered an Error as Didn't recevied any response and Error Messages is : ${error.message} `
        );
      }

      state.dashboardData = action.payload;
    });
  },
});

export const dashboardData = (state) => state.user.dashboardData;
export const { loaderChange } = userSlice.actions;
export default userSlice.reducer;

