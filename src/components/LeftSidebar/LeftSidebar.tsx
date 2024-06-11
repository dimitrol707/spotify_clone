import { SidebarLibrary } from "./SibebarLibrary/SidebarLibrary";
import cls from "./LeftSidebar.module.css";
import classNames from "classnames";
import { ContentContainer } from "../../ui/ContentContainer/ContentContainer";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export const LeftSidebar = () => {
  return (
    <aside className={cls.sidebar}>
      <ContentContainer>
        <ul className={cls.nav}>
          <li className={cls.nav_item}>
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                classNames(cls.nav_link, {
                  [cls.nav_link_active]: isActive,
                })
              }
            >
              <FontAwesomeIcon icon={faHouse} size="lg" />
              <span>Home</span>
            </NavLink>
          </li>
          <li className={cls.nav_item}>
            <NavLink
              to={"/search"}
              className={({ isActive }) =>
                classNames(cls.nav_link, {
                  [cls.nav_link_active]: isActive,
                })
              }
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
              <span>Search</span>
            </NavLink>
          </li>
        </ul>
      </ContentContainer>
      <SidebarLibrary />
    </aside>
  );
};
