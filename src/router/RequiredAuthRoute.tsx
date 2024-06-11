import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getToken } from "../store/auth/authSelectors";
import { checkToRefreshToken } from "../api/token";
import {
  getUserData,
  getUserError,
  getUserIsLoading,
} from "../store/user/userSelectors";
import { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";
import { fetchUserThunk } from "../store/user/userSlice";
import { Loader } from "../ui/Loader/Loader";
import cls from "./RequiredAuthRoute.module.css";

export const RequiredAuthRoute = () => {
  const navigate = useNavigate();
  const token = useSelector(getToken);
  const user = useSelector(getUserData);
  const userIsLoading = useSelector(getUserIsLoading);
  const userError = useSelector(getUserError);
  const dispatch = useDispatch<AppDispatch>();

  if (!token || checkToRefreshToken(token)) {
    navigate("/login");
  }

  useEffect(() => {
    console.log(456);
    if (!user) {
      dispatch(fetchUserThunk());
    }
  }, []);

  if (user) {
    return <Outlet />;
  }

  return (
    <div className={cls.page_container}>
      {userIsLoading && <Loader />}
      {!userIsLoading && userError && (
        <span style={{ color: "white" }}>{userError.message}</span>
      )}
    </div>
  );
};
