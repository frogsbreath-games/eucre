import * as React from "react";
import * as ReactDOM from "react-dom";
import DropZone from "./DropZone";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

it("renders without crashing", () => {
  const dropZoneProps = {
    name: "zone",
    accept: "droppable",
  };

  ReactDOM.render(
    <DndProvider backend={HTML5Backend}>
      <DropZone {...dropZoneProps} />
    </DndProvider>,
    document.createElement("div")
  );
});
