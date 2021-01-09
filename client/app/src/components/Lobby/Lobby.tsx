import * as React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "app/store";
import styles from "./Lobby.module.scss";
import * as LobbyStore from "app/store/Lobby";

// At runtime, Redux will merge together...
type LobbyProps = LobbyStore.LobbyState & // ... state we've requested from the Redux store
  typeof LobbyStore.actionCreators; // ... plus action creators we've requested

class Lobby extends React.PureComponent<LobbyProps> {
  constructor(props: LobbyProps) {
    super(props);
    this.chat = this.chat.bind(this);
  }
  // This method is called when the component is first added to the document
  public componentDidMount() {
    this.props.enterLobby();
    this.props.requestLobby();
  }

  public chat(message: string) {
    this.props.chat(message);
  }

  public render() {
    console.log(this.props.room);
    return (
      <React.Fragment>
        <div></div>
      </React.Fragment>
    );
  }
}

export default connect(
  (state: ApplicationState) => state.lobby, // Selects which state properties are merged into the component's props
  LobbyStore.actionCreators // Selects which action creators are merged into the component's props
)(Lobby as any); // eslint-disable-line @typescript-eslint/no-explicit-any
