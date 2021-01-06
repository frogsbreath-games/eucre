import * as React from "react";
import * as ReactDOM from "react-dom";
import Stack from "./Stack";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import * as Types from "app/games/eucre/types";

it("renders without crashing", () => {
  const stackProps = {
    cards: [{ value: 1, suit: "Clubs" }] as Types.Card[],
  };

  ReactDOM.render(
    <DndProvider backend={HTML5Backend}>
      <Stack {...stackProps} />
    </DndProvider>,
    document.createElement("div")
  );
});
