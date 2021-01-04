import * as React from "react";
import * as ReactDOM from "react-dom";
import Card from "./Card";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

it("renders without crashing", () => {
  const cardProps = {
    value: 5,
  };

  ReactDOM.render(
    <DndProvider backend={HTML5Backend}>
      <Card {...cardProps} />
    </DndProvider>,
    document.createElement("div")
  );
});
