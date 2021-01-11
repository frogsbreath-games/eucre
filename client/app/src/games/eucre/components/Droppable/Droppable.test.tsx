import * as React from "react";
import * as ReactDOM from "react-dom";
import Droppable from "./Droppable";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

it("renders without crashing", () => {
  const droppableProps = {
    dragType: "droppable",
  };

  ReactDOM.render(
    <DndProvider backend={HTML5Backend}>
      <Droppable {...droppableProps} />
    </DndProvider>,
    document.createElement("div")
  );
});
