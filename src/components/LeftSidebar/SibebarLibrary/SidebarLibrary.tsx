import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ContentContainer } from "../../../ui/ContentContainer/ContentContainer";
import cls from "./SidebarLibrary.module.css";
import {
  faArrowRight,
  faBookOpen,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "../../../ui/IconButton/IconButton";
import classNames from "classnames";

export const SidebarLibrary = () => {
  return (
    <ContentContainer>
      <div className={cls.sidebar_library}>
        <header className={cls.header}>
          <div className={cls.header_title}>
            <FontAwesomeIcon icon={faBookOpen} size="lg" />
            <span>Your Library</span>
          </div>
          <div className={cls.header_toolbar}>
            <IconButton icon={faPlus} />
            <IconButton icon={faArrowRight} />
          </div>
        </header>
        <div className={cls.filters}>
          <div className={cls.filters_toolbar}>
            <button className={classNames(cls.filter_button, cls.active)}>
              Playlists
            </button>
            <button className={cls.filter_button}>Artists</button>
            <button className={cls.filter_button}>Albums</button>
          </div>
        </div>
        {/* <div>
          <button>Поиск</button>
          <button>Недавно прослушано</button>
        </div> */}
      </div>
    </ContentContainer>
  );
};
