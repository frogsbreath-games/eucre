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
        <h4>{this.props.game.description}</h4>
        <div className={styles.handArea}>
          <Hand
            hand={this.props.game.deck.slice(0, 5)}
            cardAction={this.handleStackDrop}
          />
          <div>
            <label>Drag a card onto me!</label>
            <Stack cards={this.props.game.pile} />
          </div>
        </div>
        <div className={styles.cardDisplay}>
          {this.props.game.deck.map((card) => (
            <div className={styles.card}>
              <Card
                suit={card.suit}
                value={card.value}
                key={card.suit + card.value}
                front={true}
                dropAction={this.handleStackDrop}
              />
            </div>
          ))}
        </div>
        <Button
          variant="blue"
          type="button"
          onClick={() => {
            this.props.shuffle();
          }}
        >
          Shuffle
        </Button>
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
