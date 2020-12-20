import * as React from "react";
import styles from "./Main.module.scss";

const Main: React.FunctionComponent<{}> = ({
  children
}) => {
  return (
    <main className={styles.main}>
    {children}
    </main>
  );
};

export default Main;
