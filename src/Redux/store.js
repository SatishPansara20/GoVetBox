import { configureStore } from "@reduxjs/toolkit";
import reduxApiMiddleware from "./Middleware";
import thunk from "redux-thunk";
import AuthSlice from "./AuthSlice";
import UserSlice from "./UserSlice";

const logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.info("dispatching", action);
  let result = next(action);
  console.log("next state", store.getState());
  console.groupEnd();
  return result;
};

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    user: UserSlice,
  },
  middleware: [thunk, reduxApiMiddleware, logger],
});
