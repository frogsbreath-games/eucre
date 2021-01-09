import * as React from "react";
import styles from "./ProfilePage.module.scss";
import Profile from "../../components/Profile/Profile";
import { connect } from "react-redux";

const ProfilePage = () => (
  <div>
    <Profile />
  </div>
);

export default connect()(ProfilePage);
