import { createSlice } from "@reduxjs/toolkit";

import {
  API_GET_USER_LIST,
  GET_USER_LIST_S,
  GET_USER_LIST_F,
  API_GET_USER_DETAIL,
  GET_USER_DETAIL_S,
  GET_USER_DETAIL_F,
  API_UPDATE_USER,
  UPDATE_USER_S,
  UPDATE_USER_F,
  API_DELETE_USER,
  DELETE_USER_S,
  DELETE_USER_F,
  API_BLOCKUNBLOCK_USER,
  BLOCKUNBLOCK_USER_S,
  BLOCKUNBLOCK_USER_F,
} from "../constants";

const initialState = {
  userList: {},
  userInfo: {},
  updateUserInfo: {},
  deleteUserInfo: {},
  blockUnblockUserInfo: {},
};

export const getUserList = (data) => ({
  type: "API",
  payload: {
    url: API_GET_USER_LIST,
    method: "POST",
    data: data,
    hideLoader: false,
    headers: { "Content-Type": "application/json" },
    success: (data) => ({
      type: GET_USER_LIST_S,
      payload: data,
    }),
    error: (data) => ({
      type: GET_USER_LIST_F,
      payload: data,
    }),
  },
});

export const getUserDetail = (data) => ({
  type: "API",
  payload: {
    url: API_GET_USER_DETAIL,
    method: "POST",
    data: data,
    hideLoader: false,
    headers: { "Content-Type": "application/json" },
    success: (data) => ({
      type: GET_USER_DETAIL_S,
      payload: data,
    }),
    error: (data) => ({
      type: GET_USER_DETAIL_F,
      payload: data,
    }),
  },
});

export const updateUser = (data) => {
  // for (const pair of data.entries()) {
  //   console.log(`${pair[0]}, ${pair[1]}`);
  // }

  return {
    type: "API",
    payload: {
      url: API_UPDATE_USER,
      method: "POST",
      data: data,
      hideLoader: false,
      headers: { "Content-Type": "multipart/form-data" },
      success: (data) => ({
        type: UPDATE_USER_S,
        payload: data,
      }),
      error: (data) => ({
        type: UPDATE_USER_F,
        payload: data,
      }),
    },
  };
};

export const deleteUser = (data) => {
  // for (const pair of data.entries()) {
  //   console.log(`${pair[0]}, ${pair[1]}`);
  // }

  return {
    type: "API",
    payload: {
      url: API_DELETE_USER,
      method: "POST",
      data: data,
      hideLoader: false,
      headers: { "Content-Type": "application/json" },
      success: (data) => ({
        type: DELETE_USER_S,
        payload: data,
      }),
      error: (data) => ({
        type: DELETE_USER_F,
        payload: data,
      }),
    },
  };
};

export const blockUnblockUser = (data) => {
  // for (const pair of data.entries()) {
  //   console.log(`${pair[0]}, ${pair[1]}`);
  // }

  return {
    type: "API",
    payload: {
      url: API_BLOCKUNBLOCK_USER,
      method: "POST",
      data: data,
      hideLoader: false,
      headers: { "Content-Type": "application/json" },
      success: (data) => ({
        type: BLOCKUNBLOCK_USER_S,
        payload: data,
      }),
      error: (data) => ({
        type: BLOCKUNBLOCK_USER_S,
        payload: data,
      }),
    },
  };
};

// Reducer
const UserManagementSlice = createSlice({
  name: "usermanagement",
  initialState: initialState,
  extraReducers: (builder) => {
    //NOTE: GET_USER_LIST
    builder.addCase(GET_USER_LIST_S, (state, action) => {
      state.userInfo = {};
      state.deleteUserInfo = {};
      state.blockUnblockUserInfo = {};
      const response = action.payload;
      if (response?.status === 200) {
        state.userList = action.payload;
      }
    });
    builder.addCase(GET_USER_LIST_F, (state, action) => {
      console.log(
        `ERROR WHILE EXECUTING ${GET_USER_LIST_F} : ${action.payload}`
      );
      state.userList = {};
    });

    //NOTE: GET_USER_DETAIL
    builder.addCase(GET_USER_DETAIL_S, (state, action) => {
      const response = action.payload;
      state.userInfo = {};
      if (response?.status === 200) {
        state.userInfo = action.payload;
      }
    });
    builder.addCase(GET_USER_DETAIL_F, (state, action) => {
      console.log(
        `ERROR WHILE EXECUTING ${GET_USER_DETAIL_F} : ${action.payload}`
      );
      state.userInfo = {};
    });

    //NOTE: UPDATE USER_INFO
    builder.addCase(UPDATE_USER_S, (state, action) => {
      const response = action.payload;
      if (response?.status === 200) {
        state.updateUserInfo = response;
      }
    });
    builder.addCase(UPDATE_USER_F, (state, action) => {
      state.updateUserInfo = {};
      console.log(`ERROR WHILE EXECUTING ${UPDATE_USER_F} : ${action.payload}`);
    });

    //NOTE:   DELETE USER INFO
    builder.addCase(DELETE_USER_S, (state, action) => {
      state.deleteUserInfo = {};
      const response = action.payload;
      if (response?.status === 200) {
        state.deleteUserInfo = response;
      }
    });
    builder.addCase(DELETE_USER_F, (state, action) => {
      state.deleteUserInfo = {};
      console.log(`ERROR WHILE EXECUTING ${UPDATE_USER_F} : ${action.payload}`);
    });

    //NOTE:   BLOCKUNBLOCK USER
    builder.addCase(BLOCKUNBLOCK_USER_S, (state, action) => {
      state.blockUnblockUserInfo = {};
      const response = action.payload;
      if (response?.status === 200) {
        state.blockUnblockUserInfo = response;
      }
    });
    builder.addCase(BLOCKUNBLOCK_USER_F, (state, action) => {
      state.blockUnblockUserInfo = {};
      console.log(`ERROR WHILE EXECUTING ${UPDATE_USER_F} : ${action.payload}`);
    });
  },
});

export const userList = (state) => state.usermanagement.userList;
export const userInfo = (state) => state.usermanagement.userInfo;
export const updateUserInfo = (state) => state.usermanagement.updateUserInfo;
export const deleteUserInfo = (state) => state.usermanagement.deleteUserInfo;
export const blockUnblockUserInfo = (state) =>
  state.usermanagement.blockUnblockUserInfo;
export const { loaderChange } = UserManagementSlice.actions;
export default UserManagementSlice.reducer;
