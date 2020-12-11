import * as React from "react";
import styles from "./Button.module.css";

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => (
  <button className={styles.button} {...props}>
    {children}
  </button>
);

export default Button;
