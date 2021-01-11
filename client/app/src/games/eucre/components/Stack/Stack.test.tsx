import * as React from "react";
import * as ReactDOM from "react-dom";
import Stack from "./Stack";
import * as Types from "app/games/eucre/types";

it("renders without crashing", () => {
  const stackProps = {
    cards: [{ value: 1, suit: "Clubs" }] as Types.Card[],
  };

  ReactDOM.render(<Stack {...stackProps} />, document.createElement("div"));
});
