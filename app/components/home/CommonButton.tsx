interface CommonButtonProps {
  buttonText: string;
  buttonFunction: () => void;
}

export const CommonButton = ({
  buttonText,
  buttonFunction,
}: CommonButtonProps) => {
  return (
    <div onClick={buttonFunction}>
      <span>{buttonText}</span>
    </div>
  );
};
