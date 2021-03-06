import * as React from "react";
import { connect } from "react-redux";
import { Card } from "app/games/eucre/components";
import { Button, Input, Select } from "app/ui";
import * as Types from "app/games/eucre/types";
import styles from "./Home.module.scss";

interface HomeState {
  cardSuit: Types.Suit;
  cardValue?: number;
  input: string;
  inputInt: number;
}
class Home extends React.Component<{}, HomeState> {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      input: "1",
      cardSuit: "Clubs",
      cardValue: 12,
      inputInt: 1,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
  }

  handleChange(inputValue: string) {
    this.setState({ input: inputValue, inputInt: parseInt(inputValue) });
  }

  handleSelectChange(selectValue: Types.Suit) {
    this.setState({ cardSuit: selectValue });
  }

  handleResetClick() {
    this.setState({
      input: "1",
      cardSuit: "Clubs",
      cardValue: 12,
      inputInt: 1,
    });
  }

  render() {
    return (
      <div>
        <h1>Eucre</h1>
        <div>
          <Button onClick={this.handleResetClick}>Reset</Button>
          <Input
            type="number"
            value={this.state.input ? this.state.input : ""}
            onChange={this.handleChange}
            min="1"
            max="13"
          />
          <Select
            value={this.state.cardSuit ? this.state.cardSuit : "Hearts"}
            onChange={this.handleSelectChange}
            options={[
              { label: "Clubs", value: "Clubs" },
              { label: "Hearts", value: "Hearts" },
              { label: "Diamonds", value: "Diamonds" },
              { label: "Spades", value: "Spades" },
            ]}
          />
        </div>
        <div className={styles.cardDisplayArea}>
          <div className={styles.card}>
            <Card
              front={true}
              value={this.state.inputInt}
              suit={this.state.cardSuit}
            />
          </div>
          <div className={styles.card}>
            <Card front={false} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(Home);
