import * as React from "react";
import styles from "./ProfilePage.module.scss";
import * as Eucre from "app/games/eucre";
import { connect } from "react-redux";

const ProfilePage = () => (
  <div>
    <Eucre.Components.Profile />
  </div>
);

export default connect()(ProfilePage);
