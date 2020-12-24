import * as React from "react";
import styles from "./Button.module.css";

type Variant = "red" | "blue" | "green" | "grey" | "flat";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
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
