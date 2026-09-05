interface CommonButtonProps {
  buttonText: string;
  buttonStyle?: string;
  buttonFunction: () => void;
}

export const CommonButton = ({
  buttonText,
  buttonStyle,
  buttonFunction,
}: CommonButtonProps) => {
  return (
    <div
      onClick={buttonFunction}
      className={`${buttonStyle} border border-white rounded-lg p-1 cursor-pointer flex justify-center items-center`}
    >
      <span>{buttonText}</span>
    </div>
  );
};
