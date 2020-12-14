import * as React from "react";
import { connect } from "react-redux";
import Card from "./Card/Card";
import { Button, Input, Select } from "../ui";

interface HomeState {
  cardSuit?: string;
  cardValue?: number;
  input: string;
  inputInt: number;
}
class Home extends React.Component<{}, HomeState> {
  componentWillMount() {
    this.setState({
      input: "1",
      cardSuit: "Clubs",
      cardValue: 12,
      inputInt: 1,
    });

    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
  }

  handleChange(inputValue: string) {
    this.setState({ input: inputValue, inputInt: parseInt(inputValue) });
  }

  handleSelectChange(selectValue: string) {
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
        <Card
          front={true}
          value={this.state.inputInt}
          suit={this.state.cardSuit}
        />
        <Card front={false} />
      </div>
    );
  }
}

export default connect()(Home);
