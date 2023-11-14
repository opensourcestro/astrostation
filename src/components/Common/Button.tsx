import clsx from "clsx";

const classes: { [key: string]: any } = {
  base: "focus:outline-none transition ease-in-out duration-300",
  disabled: "opacity-50 cursor-not-allowed",
  pill: "rounded-full",
  type: "submit",
  size: {
    small: "px-2 py-1 text-sm",
    normal: "px-4 py-2",
    large: "px-8 py-3 text-lg",
  },
  variant: {
    primary: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
    secondary: "bg-stone-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
    danger: "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded",
    cold: "bg-blue-grey-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
    bottomButton:
      "bg-white/50 hover:bg-purple text-altBlack hover:text-altWhite font-bold rounded shadow-sm  focus:outline-none dark:bg-black/50 dark:text-altWhite dark:hover:bg-purple",
    coldPrimary: "bg-blue-700 text-white font-bold py-2 px-4 rounded ",
  },
};

export const Button = ({
  children,
  className,
  type = "submit",
  variant = "primary",
  size = "normal",
  disabled = false,
  onClick,
}: {
  children: any;
  className?: string;
  type?: any;
  variant?: string;
  size?: string;
  onClick?: React.MouseEventHandler;
  disabled?: boolean;
}) => {
  return (
    <button
      disabled={disabled}
      className={clsx(
        classes.base,
        classes.size[size],
        classes.variant[variant],
        disabled && classes.disabled,
        className
      )}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};
