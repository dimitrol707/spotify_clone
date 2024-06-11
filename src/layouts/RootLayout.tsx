import { Outlet } from "react-router-dom";
import cls from "./RootLayout.module.css";

export const RootLayout = () => {
  return (
    <main className={cls.main}>
      <Outlet />
    </main>
  );
};
