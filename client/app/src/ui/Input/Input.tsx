import * as React from "react";
import styles from "./Input.module.scss";

interface IProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value"
  > {
  value: string;

  onChange(value: string): void;
}

const Input: React.FunctionComponent<IProps> = ({
  children,
  onChange,
  ...shared
}) => {
  return (
    <input
      className={styles.input}
      onChange={(e) => onChange(e.target.value)}
      {...shared}
    />
  );
};

export default Input;

Input.defaultProps = {
  type: "text",
};
