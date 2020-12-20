import * as React from "react";
import * as ReactDOM from "react-dom";
import Main from "./Main";

it("renders without crashing", () => {
  ReactDOM.render(
    <Main>
      <div>This is a test</div>
    </Main>,
    document.createElement("div")
  );
});
