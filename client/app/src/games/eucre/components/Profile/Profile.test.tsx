import * as React from "react";
import * as ReactDOM from "react-dom";
import Profile from "./Profile";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

it("renders without crashing", () => {
  ReactDOM.render(
    <DndProvider backend={HTML5Backend}>
      <Profile />
    </DndProvider>,
    document.createElement("div")
  );
});
