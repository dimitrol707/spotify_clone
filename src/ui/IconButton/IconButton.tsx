import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cls from "./IconButton.module.css";
import classNames from "classnames";

type IconButtonHoverType = "background" | "icon";

interface IIconButtonProps {
  icon: IconDefinition;
  hoverType?: IconButtonHoverType;
  active?: boolean;
}

export const IconButton = ({
  icon,
  hoverType = "background",
  active,
}: IIconButtonProps) => {
  return (
    <button
      className={classNames(cls.button, [cls[`hover_${hoverType}`]], {
        [cls.active]: active,
      })}
    >
      <FontAwesomeIcon icon={icon} size="lg" />
    </button>
  );
};
