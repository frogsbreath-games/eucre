import * as React from "react";
import * as ReactDOM from "react-dom";
import DragWrapper from "./DragWrapper";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

it("renders without crashing", () => {
  const droppableProps = {
    dragType: "droppable",
  };

  ReactDOM.render(
    <DndProvider backend={HTML5Backend}>
      <DragWrapper {...droppableProps} />
    </DndProvider>,
    document.createElement("div")
  );
});
