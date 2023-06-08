import { EyeIcon } from "../Icon/EyeIcon";

export const PasswordButton = ({ onClick, crossLine }) => {
  const handleClick = () => {
    onClick && onClick();
  };

  return (
    <button onClick={handleClick}>
      <EyeIcon crossLine={crossLine} width="16" height="16" />
    </button>
  );
};
