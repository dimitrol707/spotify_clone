import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./user/userSlice";
import { api } from "../api/api";
import { IThunkExtraArg } from "./types";
import { authReducer } from "./auth/authSlice";

const extraArgument: IThunkExtraArg = {
  api,
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument,
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
