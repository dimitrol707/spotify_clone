import cls from "./LoginPage.module.css";
import { useEffect, useState } from "react";
import { checkToRefreshToken, getURLForAuthorize } from "../../api/token";
import { useNavigate } from "react-router-dom";
import { handleError } from "../../api/utils/handleError";
import { Loader } from "../../ui/Loader/Loader";
import logoImg from "../../assets/images/spotify_logo.png";
import { useSelector } from "react-redux";
import { getToken } from "../../store/auth/authSelectors";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth/authSlice";

export const LoginPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const token = useSelector(getToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      if (checkToRefreshToken(token)) {
        navigate("/callback");
      } else {
        navigate("/");
      }
    }
    setIsLoading(false);
  }, []);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const [url, codeVerifier] = await getURLForAuthorize();
      dispatch(authActions.setCodeVerifier(codeVerifier));
      window.location.href = url.toString();
    } catch (error) {
      setError(handleError(error).message);
      setIsLoading(false);
    }
  };

  return (
    <div className={cls.page_container}>
      <div className={cls.login_container}>
        <div className={cls.logo_container}>
          <img src={logoImg} width={100} height={100} />
          <span className={cls.logo_text}>Spotify test app</span>
        </div>
        {isLoading && <Loader />}
        {!isLoading && (
          <button className={cls.login_btn} onClick={handleLogin}>
            Login
          </button>
        )}
        {error && <span className={cls.error}>{error}</span>}
      </div>
    </div>
  );
};
