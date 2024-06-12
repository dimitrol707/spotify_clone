import { base64Encode, generateRandomString, sha256 } from "../utils";
import config from "./config";
import { IErrorAccountsAPI, IResponseToken } from "./types";
import { ApiError } from "./error";

export const getURLForAuthorize = async (): Promise<[URL, string]> => {
  const codeVerifier = generateRandomString(64);
  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64Encode(hashed);
  const url = new URL(config.AUTH_ENDPOINT);
  url.search = new URLSearchParams({
    client_id: config.CLIENT_ID,
    response_type: config.RESPONSE_TYPE_CODE,
    redirect_uri: config.REDIRECT_URI,
    scope: config.SCOPE,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
  }).toString();
  return [url, codeVerifier];
};

export const fetchToken = async (
  code: string,
  codeVerifier: string
): Promise<IResponseToken> => {
  try {
    const response = await fetch(config.TOKEN_ENDPOINT, {
      method: "post",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: config.CLIENT_ID,
        grant_type: "authorization_code",
        code,
        redirect_uri: config.REDIRECT_URI,
        code_verifier: codeVerifier,
      }),
    });

    if (!response.ok) {
      const errorData = (await response.json()) as IErrorAccountsAPI;
      throw new ApiError(
        `${errorData.error}: ${errorData.error_description}`,
        response.status
      );
    }

    const responseToken = (await response.json()) as IResponseToken;

    responseToken.start_timestamp = new Date().getTime();

    return responseToken;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const checkToRefreshToken = (token: IResponseToken): boolean => {
  if (!token) return false;

  const nowTimestamp = new Date().getTime();
  const expiresTimestamp = token.expires_in * 1000 + token.start_timestamp;
  if (nowTimestamp >= expiresTimestamp) {
    return true;
  }

  return false;
};

export const refreshToken = async (
  refreshToken: string
): Promise<IResponseToken> => {
  try {
    const response = await fetch(config.TOKEN_ENDPOINT, {
      method: "post",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: config.CLIENT_ID,
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
    });

    if (!response.ok) {
      const errorData = (await response.json()) as IErrorAccountsAPI;
      throw new ApiError(
        `${errorData.error}: ${errorData.error_description}`,
        response.status
      );
    }

    const responseToken = (await response.json()) as IResponseToken;

    responseToken.start_timestamp = new Date().getTime();

    return responseToken;
  } catch (error) {
    return Promise.reject(error);
  }
};
