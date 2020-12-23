import * as React from "react";
import styles from "./EucrePage.module.scss";
import * as Eucre from "app/games/eucre";
import { connect } from "react-redux";

const EucrePage = () => (
  <div className={styles.page}>
    <Eucre.Components.Game />
  </div>
);

export default connect()(EucrePage);
