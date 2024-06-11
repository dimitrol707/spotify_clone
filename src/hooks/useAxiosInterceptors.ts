import { useNavigate } from "react-router-dom";
import { api } from "../api/api";
import { getToken } from "../store/auth/authSelectors";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth/authSlice";
import { InternalAxiosRequestConfig } from "axios";
import { handleError } from "../api/utils/handleError";
import { UnauthorizedError } from "../api/error";
import { refreshToken } from "../api/token";
import { AppDispatch } from "../store/store";

interface IAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry: boolean;
}
export const useAxiosInterceptors = () => {
  const navigate = useNavigate();
  const token = useSelector(getToken);
  const dispatch = useDispatch<AppDispatch>();

  api.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token.access_token}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (!token) {
        navigate("/login");
      } else {
        const apiError = handleError(error);
        const originalRequest = error.config as IAxiosRequestConfig;
        if (apiError instanceof UnauthorizedError && !originalRequest._retry) {
          try {
            originalRequest._retry = true;
            const tokenRefreshed = await refreshToken(token.refresh_token);
            dispatch(authActions.setToken(tokenRefreshed));
            originalRequest.headers.Authorization = `Bearer ${tokenRefreshed.access_token}`;
            return api(originalRequest);
          } catch (error) {
            dispatch(authActions.clearToken());
            navigate("/login");
          }
        }
      }

      return Promise.reject(handleError(error));
    }
  );
};
