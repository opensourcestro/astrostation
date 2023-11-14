/* Component for customization buttons in top right of the screen */
export const CustomizationButton = props => {
  return (
    <div>
      <button
        type="button"
        className="flex items-center rounded-md bg-white/50 px-4 py-2 text-sm font-medium text-altBlack hover:bg-purple hover:text-altWhite shadow-sm focus:outline-none dark:bg-black/50 dark:text-altWhite dark:hover:bg-purple"
        onClick={() => props.changeModal(true)}
      >
        {props.title}
        {props.icon}
      </button>
      <div className="flex justify-end space-x-6">{props.modal}</div>
    </div>
  );
};
