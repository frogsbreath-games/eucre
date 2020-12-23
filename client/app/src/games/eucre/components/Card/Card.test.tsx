import * as React from "react";
import * as ReactDOM from "react-dom";
import Card from "./Card";

it("renders without crashing", () => {
  const cardProps = ({
    value: 5
  });

  ReactDOM.render(
    <Card {...cardProps} />,
    document.createElement("div")
  );
});
