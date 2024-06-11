import { RootState } from "../store";

export const getAuth = (state: RootState) => state.auth;
export const getToken = (state: RootState) => state.auth.token;
export const getCodeVerifier = (state: RootState) => state.auth.codeVerifier;
