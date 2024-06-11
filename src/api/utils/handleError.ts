import { AxiosError } from "axios";
import {
  ApiError,
  ForbiddenError,
  InternalServerError,
  ToManyRequestsError,
  UnauthorizedError,
} from "../error";
import { ErrorAPIStatus, IErrorAPI, IErrorAccountsAPI } from "../types";
import { expectNever } from "../../utils/expectNever";

const isErrorApi = (errorData: any): errorData is IErrorAPI => {
  return errorData.error && errorData.error.message && errorData.error.status;
};

const isErrorAccountsApi = (errorData: any): errorData is IErrorAccountsAPI => {
  return errorData.error && errorData.error_description;
};

export const handleError = (error: unknown): ApiError | Error => {
  if (error instanceof AxiosError) {
    const { response } = error;
    if (response && response.data) {
      const errorData = response.data;
      if (isErrorApi(errorData)) {
        const { message, status } = errorData.error;
        switch (status) {
          case ErrorAPIStatus.UNAUTHORIZED:
            return new UnauthorizedError(message);
          case ErrorAPIStatus.FORBIDDEN:
            return new ForbiddenError(message);
          case ErrorAPIStatus.TO_MANY_REQUESTS:
            return new ToManyRequestsError(message);
          case ErrorAPIStatus.INTERNAL_SERVER:
            return new InternalServerError(message);
          default:
            expectNever(status);
            return new ApiError(message, status);
        }
      } else if (isErrorAccountsApi(errorData)) {
        const { error, error_description } = errorData;
        return new ApiError(`${error}: ${error_description}`, response.status);
      }
    }
  } else if (error instanceof ApiError) {
    return error;
  } else if (error instanceof Error) {
    return error;
  } else if (typeof error === "string") {
    return new Error(error);
  }
  return new Error("Unknown error");
};
