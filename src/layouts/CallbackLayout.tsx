import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkToRefreshToken, fetchToken, refreshToken } from "../api/token";
import { handleError } from "../api/utils/handleError";
import { Loader } from "../ui/Loader/Loader";
import cls from "./CallbackLayout.module.css";
import { ApiError } from "../api/error";
import { useSelector } from "react-redux";
import { getCodeVerifier, getToken } from "../store/auth/authSelectors";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth/authSlice";

export const CallbackLayout = () => {
  const navigate = useNavigate();
  const codeVerifier = useSelector(getCodeVerifier);
  const token = useSelector(getToken);
  const dispatch = useDispatch();
  const [error, setError] = useState<string>("");

  useEffect(() => {
    try {
      if (token) {
        if (checkToRefreshToken(token)) {
          refreshToken(token.refresh_token)
            .then((data) => {
              dispatch(authActions.setToken(data));
              navigate("/");
            })
            .catch((error) => {
              setError(handleError(error).message);
            });
        } else {
          navigate("/");
        }
      } else {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        const error = params.get("error");

        if (error) {
          throw new ApiError(`Authorization error: ${error}`);
        }

        if (!code || !codeVerifier) {
          throw new ApiError("Verification code not found");
        }

        fetchToken(code, codeVerifier)
          .then((data) => {
            dispatch(authActions.setToken(data));
            navigate("/");
          })
          .catch((error) => {
            setError(handleError(error).message);
          });
      }
    } catch (error) {
      setError(handleError(error).message);
    }
  }, []);

  const handleToLoginPage = () => {
    dispatch(authActions.clearToken());
    navigate("/login");
  };

  return (
    <div className={cls.page_container}>
      {error && (
        <div className={cls.error_container}>
          <span className={cls.error}>{error}</span>
          <button className={cls.login_btn} onClick={handleToLoginPage}>
            Login
          </button>
        </div>
      )}
      {!error && <Loader />}
    </div>
  );
};
