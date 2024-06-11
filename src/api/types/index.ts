export interface IResponseToken {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  refresh_token: string;
  start_timestamp: number;
}

export interface IErrorAccountsAPI {
  error: string;
  error_description: string;
}

export enum ErrorAPIStatus {
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  TO_MANY_REQUESTS = 429,
  INTERNAL_SERVER = 500,
}

export interface IErrorAPI {
  error: {
    message: string;
    status: (typeof ErrorAPIStatus)[keyof typeof ErrorAPIStatus];
  };
}

export interface IUser {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    totol: string;
  };
  href: string;
  id: string;
  images: [
    {
      url: string;
      height: number;
      width: number;
    }
  ];
  product: string;
  type: string;
  uri: string;
}
