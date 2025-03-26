import { Input, InputProps } from "@heroui/react";
import React from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const PasswordInputComponent = ({ ...props }: InputProps) => {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <Input
      {...props}
      endContent={
        <button
          aria-label="toggle password visibility"
          className="focus:outline-none"
          type="button"
          onClick={toggleVisibility}
        >
          {isVisible ? (
            <FaRegEyeSlash className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <FaRegEye className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
      type={isVisible ? "text" : "password"}
    ></Input>
  );
};

export default PasswordInputComponent;
