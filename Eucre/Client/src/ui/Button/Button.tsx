import * as React from "react";
import styles from "./Button.module.css";

type Color = "red" | "blue" | "green" | "grey";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Color;
}

const Button: React.FC<IProps> = ({ variant, children, ...props }) => (
  <button className={styles[variant + "Button"]} {...props}>
    {children}
  </button>
);

export default Button;

Button.defaultProps = {
  variant: "grey",
};
