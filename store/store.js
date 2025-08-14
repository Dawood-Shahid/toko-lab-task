import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "../service/user.service";
import userReducer from "./user.slice";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});
