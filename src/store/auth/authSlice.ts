import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  clearValueFromLocalStorage,
  getValueFromLocalStorage,
  setValueToLocalStorage,
} from "../../utils";
import { IAuthState } from "../types";
import { IResponseToken } from "../../api/types";

const initialState: IAuthState = {
  token: getValueFromLocalStorage("token"),
  codeVerifier: getValueFromLocalStorage("codeVerifier"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCodeVerifier: (state, action: PayloadAction<string>) => {
      state.codeVerifier = action.payload;
      setValueToLocalStorage<string>("codeVerifier", action.payload);
    },
    setToken: (state, action: PayloadAction<IResponseToken>) => {
      state.token = action.payload;
      setValueToLocalStorage<IResponseToken>("token", action.payload);
    },
    clearToken: (state) => {
      state.token = undefined;
      state.codeVerifier = undefined;
      clearValueFromLocalStorage("token");
      clearValueFromLocalStorage("codeVerifier");
    },
  },
});

export const { actions: authActions } = authSlice;
export const { reducer: authReducer } = authSlice;
