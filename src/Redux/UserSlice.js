import { createSlice } from "@reduxjs/toolkit";
import { API_LOGIN, USER_LIST_F, USER_LIST_S } from "../constants";

const initialState = {
  userList: [],
  userInfo: {},
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
  },
});

export const { loaderChange } = userSlice.actions;
export default userSlice.reducer;
