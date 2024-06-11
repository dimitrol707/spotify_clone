import { ReactNode } from "react";
import cls from "./ContentContainer.module.css";

interface IContentContainerProps {
  children: ReactNode;
}

export const ContentContainer = ({ children }: IContentContainerProps) => {
  return <div className={cls.container}>{children}</div>;
};
