import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./user/userSlice";
import { IThunkExtraArg } from "./types";
import { authReducer } from "./auth/authSlice";
import { fetchAuth } from "../api/utils/fetchAuth";

const extraArgument: IThunkExtraArg = {
  fetchAuth,
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
