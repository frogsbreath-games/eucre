import * as React from "react";
import * as ReactDOM from "react-dom";
import Hand from "./Hand";
import * as Types from "app/games/eucre/types";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

it("renders without crashing", () => {
  const handProps = {
    hand: [{ value: 1, suit: "Clubs" }] as Types.Card[],
  };

  ReactDOM.render(
    <DndProvider backend={HTML5Backend}>
      <Hand {...handProps} />
    </DndProvider>,
    document.createElement("div")
  );
});
