import * as React from "react";
import * as ReactDOM from "react-dom";
import NavMenu from "./NavMenu";

it("renders without crashing", () => {
  ReactDOM.render(
    <NavMenu />,
    document.createElement("div")
  );
});
