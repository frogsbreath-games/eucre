import * as React from "react";
import styles from "./Select.module.scss";

interface SelectOption {
  label: string;
  value: string;
}
interface IProps
  extends Omit<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    "onChange" | "value"
  > {
  value: string;
  onChange(value: string): void;
  options: Array<SelectOption>;
}

const Select: React.FunctionComponent<IProps> = ({
  children,
  onChange,
  options,
  ...shared
}) => {
  return (
    <select
      className={styles.select}
      onChange={(e) => onChange(e.target.value)}
      {...shared}
    >
      {options.map((option, index) => (
        <option key={index} value={option.value}>{option.label}</option>
      ))}
    </select>
  );
};

export default Select;
