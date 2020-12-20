import * as React from "react";
import NavMenu from "./NavMenu/NavMenu";
import { Main } from "../ui";

export default class Layout extends React.PureComponent<
  {},
  { children?: React.ReactNode }
> {
  public render() {
    return (
      <React.Fragment>
        <NavMenu />
        <Main>{this.props.children}</Main>
      </React.Fragment>
    );
  }
}
