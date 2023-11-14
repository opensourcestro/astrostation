import { FC } from "react";
import clsx from "clsx";

export const NavItem: FC<{
  onClick?: () => void;
  toggled?: boolean;
  shown?: boolean;
}> = ({ children, onClick, toggled, shown }) => {
  if (shown) {
    return (
      <li>
        <button
          className={clsx(
            "relative flex h-14 items-center bg-white/50 text-altBlack px-4 dark:bg-black/50 dark:text-altWhite sm:h-16 sm:px-6 md:hover:bg-purple",
            toggled &&
              "border-b-2 border-black bg-black/50 text-altWhite dark:bg-white/50 dark:text-altBlack md:hover:bg-purple"
          )}
          onClick={onClick}
        >
          {children}
        </button>
      </li>
    );
  } else {
    return <></>;
  }
};
