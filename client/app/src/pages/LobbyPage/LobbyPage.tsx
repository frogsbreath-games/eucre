import * as React from "react";
import styles from "./LobbyPage.module.scss";
import Lobby from "../../components/Lobby/Lobby";
import { connect } from "react-redux";

const LobbyPage = () => (
  <div>
    <Lobby />
  </div>
);

export default connect()(LobbyPage);
