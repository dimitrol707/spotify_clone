import { RootState } from "../store";

export const getUserData = (state: RootState) => state.user.user;
export const getUserIsLoading = (state: RootState) => state.user.isLoading;
export const getUserError = (state: RootState) => state.user.error;
