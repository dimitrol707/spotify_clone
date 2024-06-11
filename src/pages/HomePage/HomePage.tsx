import cls from "./HomePage.module.css";
import { LeftSidebar } from "../../components/LeftSidebar/LeftSidebar";
import { fetchUserThunk } from "../../store/user/userSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { useSelector } from "react-redux";
import { getUserData } from "../../store/user/userSelectors";

export const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(getUserData);

  const handleClick = () => {
    dispatch(fetchUserThunk());
  };

  return (
    <div className={cls.page_container}>
      <div className={cls.page_content}>
        <LeftSidebar />
        <button onClick={handleClick}>click</button>
        <span style={{ color: "white" }}>{user?.display_name}</span>
      </div>
    </div>
  );
};
