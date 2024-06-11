const config = {
  CLIENT_ID: "66dd6bd443384cb79ad399468ade59fc",
  REDIRECT_URI: "http://localhost:5173/callback",
  AUTH_ENDPOINT: "https://accounts.spotify.com/authorize",
  TOKEN_ENDPOINT: "https://accounts.spotify.com/api/token",
  USER_ENDPOINT: "me",
  RESPONSE_TYPE_CODE: "code",
  SCOPE: "user-read-private user-read-email",
  CODE_CHALLENGE_METHOD: "S256",
};

export default config;
