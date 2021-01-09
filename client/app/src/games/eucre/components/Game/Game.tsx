import * as React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "app/store";
import styles from "./Game.module.scss";
import * as EucreStore from "app/store/Eucre";
import Card from "../Card/Card";
import Hand from "../Hand/Hand";
import Stack from "../Stack/Stack";
import { Button } from "app/ui";
import * as Types from "app/games/eucre/types";

// At runtime, Redux will merge together...
type GameProps = EucreStore.EucreState & // ... state we've requested from the Redux store
  typeof EucreStore.actionCreators; // ... plus action creators we've requested

class Game extends React.PureComponent<GameProps> {
  constructor(props: GameProps) {
    super(props);
    this.handleStackDrop = this.handleStackDrop.bind(this);
  }
  // This method is called when the component is first added to the document
  public componentDidMount() {
    this.props.enterGame();
    this.ensureDataFetched();
  }

  public handleStackDrop(card: Types.Card) {
    this.props.play(card);
  }

  public render() {
    console.log(this.props.game);
    return (
      <React.Fragment>
        <div className={styles.gameBody}>
          <div className={styles.descriptionPanel}>
            <h4>{this.props.game.description}</h4>
          </div>
          <div className={styles.controlPanel}>
            <Button
              style={{ width: 150, height: 50 }}
              variant="blue"
              type="button"
              onClick={() => {
                this.props.shuffle();
              }}
            >
              Shuffle
            </Button>
          </div>
          <div className={styles.northPlayer}>
            <Hand
              hand={this.props.game.partnerHand.cards}
              cardAction={this.handleStackDrop}
            />
          </div>
          <div className={styles.play}>
            <label>Drag a card onto me!</label>
            <Stack cards={this.props.game.pile} />
          </div>
          <div className={styles.eastPlayer}>
            <Hand
              hand={this.props.game.leftOpponentHand.cards}
              cardAction={this.handleStackDrop}
            />
          </div>
          <div className={styles.southPlayer}>
            <Hand
              hand={this.props.game.playerHand.cards}
              cardAction={this.handleStackDrop}
              revealed={true}
            />
          </div>
          <div className={styles.westPlayer}>
            <Hand
              hand={this.props.game.rightOpponentHand.cards}
              cardAction={this.handleStackDrop}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }

  private ensureDataFetched() {
    this.props.requestEucreCards();
  }
}

export default connect(
  (state: ApplicationState) => state.eucre, // Selects which state properties are merged into the component's props
  EucreStore.actionCreators // Selects which action creators are merged into the component's props
)(Game as any); // eslint-disable-line @typescript-eslint/no-explicit-any
