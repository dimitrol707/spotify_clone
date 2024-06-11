import { AxiosInstance } from "axios";
import { IResponseToken, IUser } from "../../api/types";
import { ApiError } from "../../api/error";

export interface IThunkExtraArg {
  api: AxiosInstance;
}

export interface IUserState {
  user?: IUser;
  isLoading: boolean;
  error?: ApiError;
}

export interface IAuthState {
  token?: IResponseToken;
  codeVerifier?: string;
}
