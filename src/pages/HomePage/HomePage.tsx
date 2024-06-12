import cls from "./HomePage.module.css";
import { LeftSidebar } from "../../components/LeftSidebar/LeftSidebar";

export const HomePage = () => {
  return (
    <div className={cls.page_container}>
      <div className={cls.page_content}>
        <LeftSidebar />
      </div>
    </div>
  );
};
