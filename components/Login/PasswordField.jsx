import { useState } from "react";
import { PasswordButton } from "../Button/PasswordButton";

export const PasswordField = ({
  id = "password-input",
  value = "",
  onChange,
  styles,
  onBlur,
}) => {
  const [fieldType, setFieldType] = useState("password");

  const handleChangePasswordType = () => {
    fieldType === "text" && setFieldType("password");
    fieldType === "password" && setFieldType("text");
  };

  const crossLine = fieldType === "text";

  return (
    <div className={`relative `}>
      <input
        className={`input-box ${styles} border-0`}
        id={id}
        type={fieldType}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <div className="flex absolute right-3 top-1/2 transform -translate-y-1/2">
        <PasswordButton
          crossLine={crossLine}
          onClick={handleChangePasswordType}
        />
      </div>
    </div>
  );
};
