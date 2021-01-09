import * as React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "app/store";
import styles from "./Lobby.module.scss";
import * as LobbyStore from "app/store/Lobby";

// At runtime, Redux will merge together...
type LobbyProps = LobbyStore.LobbyState & // ... state we've requested from the Redux store
  typeof LobbyStore.actionCreators; // ... plus action creators we've requested

type State = { input: string };
class Lobby extends React.PureComponent<LobbyProps, State> {
  constructor(props: LobbyProps) {
    super(props);
    this.state = { input: "" };
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.chat = this.chat.bind(this);
  }
  // This method is called when the component is first added to the document
  public componentDidMount() {
    this.props.enterLobby();
    this.props.requestLobby();
  }

  public handleKeyPress(event: React.KeyboardEvent) {
    var keyCode = event.keyCode || event.which;
    if (keyCode === 13) {
      this.chat(this.state.input);
    }
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ input: event.target.value });
  }

  public chat(message: string) {
    this.props.chat(message);
  }

  public render() {
    console.log(this.props.room);
    return (
      <React.Fragment>
        <div>
          <h3>{this.props.chatMessage.message}</h3>
          <input
            className={styles.input}
            type="text"
            placeholder="Message something..."
            value={this.state.input}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default connect(
  (state: ApplicationState) => state.lobby, // Selects which state properties are merged into the component's props
  LobbyStore.actionCreators // Selects which action creators are merged into the component's props
)(Lobby as any); // eslint-disable-line @typescript-eslint/no-explicit-any
