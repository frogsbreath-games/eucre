import * as React from "react";
import NavMenu from "./NavMenu/NavMenu";

export default class Layout extends React.PureComponent<
  {},
  { children?: React.ReactNode }
> {
  public render() {
    return (
      <React.Fragment>
        <NavMenu />
        <div>{this.props.children}</div>
      </React.Fragment>
    );
  }
}
