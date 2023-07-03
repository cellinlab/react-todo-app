import React from "react";

import "./index.scss";

const buttonTypes = {
  primary: "primary",
  secondary: "secondary",
};

const Button = ({ type, variant = buttonTypes.primary, children, ...rest }) => {
  return (
    <button
      type={type === "submit" ? "submit" : "button"}
      className={`button button--${variant}`}
      {...rest}
    >
      {children}
    </button>
  );
};

const SelectButton = ({ children, id, ...rest }) => {
  return (
    <select id={id} className="button button__select" {...rest}>
      {children}
    </select>
  );
};

export { SelectButton };
export default Button;
