import { ErrorAPIStatus } from "./types";

export class ApiError extends Error {
  status: number;
  constructor(
    message: string,
    status: number = ErrorAPIStatus.INTERNAL_SERVER
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string = "User is not authorized") {
    super(message, ErrorAPIStatus.UNAUTHORIZED);
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string = "Bad OAuth request") {
    super(message, ErrorAPIStatus.FORBIDDEN);
    this.name = "ForbiddenError";
  }
}

export class ToManyRequestsError extends ApiError {
  constructor(message: string = "Exceeded the limit") {
    super(message, ErrorAPIStatus.TO_MANY_REQUESTS);
    this.name = "ToManyRequestsError";
  }
}

export class InternalServerError extends ApiError {
  constructor(message: string = "Internal server error") {
    super(message);
    this.name = "InternalServerError";
  }
}
