import { authActions } from "../../store/auth/authSlice";
import { store } from "../../store/store";
import { UnauthorizedError } from "../error";
import { refreshToken } from "../token";
import { ErrorAPIStatus, IErrorAPI } from "../types";

export interface IFetchAuth {
  <T>(url: string, options: RequestInit, retry?: boolean): Promise<T>;
}

export const fetchAuth: IFetchAuth = async <T>(
  url: string,
  options: RequestInit,
  retry: boolean = false
): Promise<T> => {
  try {
    const token = store.getState().auth.token;
    if (!token) throw new UnauthorizedError();

    const response = await fetch(`https://api.spotify.com/v1/${url}`, {
      headers: {
        authorization: `Bearer ${token.access_token}`,
      },
      ...options,
    });

    if (response.status === ErrorAPIStatus.UNAUTHORIZED) {
      if (!retry) {
        const tokenRefreshed = await refreshToken(token.refresh_token);
        store.dispatch(authActions.setToken(tokenRefreshed));
        return fetchAuth<T>(url, options, true);
      }
      store.dispatch(authActions.clearToken());
      const errorData = (await response.json()) as IErrorAPI;
      throw new UnauthorizedError(errorData.error.message);
    }

    const data = (await response.json()) as T;

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
