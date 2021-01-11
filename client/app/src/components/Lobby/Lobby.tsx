import * as React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "app/store";
import styles from "./Lobby.module.scss";
import * as LobbyStore from "app/store/Lobby";
import { Input } from "app/ui";

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
    var keyCode = event.code;
    if (keyCode === "Enter") {
      this.chat(this.state.input);
    }
  }

  handleChange(input: string) {
    this.setState({ input: input });
  }

  public chat(message: string) {
    this.props.chat(message);
  }

  public render() {
    console.log(this.props.room);
    console.log(this.props.chatMessage);
    return (
      <React.Fragment>
        <div className={styles.lobby}>
          {this.props.chatMessage.message && (
            <div>
              <span>{this.props.chatMessage.message}</span>
            </div>
          )}
          <Input
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
