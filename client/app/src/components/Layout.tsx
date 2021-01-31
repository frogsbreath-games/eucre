import * as React from "react";
import NavMenu from "./NavMenu/NavMenu";
import { Main } from "app/ui";
import { connect } from "react-redux";
import { ApplicationState } from "app/store";
import * as ProfileStore from "app/store/Profile";

// At runtime, Redux will merge together...
type ProfileProps = ProfileStore.ProfileState & // ... state we've requested from the Redux store
  typeof ProfileStore.actionCreators; // ... plus action creators we've requested

class Layout extends React.PureComponent<
  ProfileProps,
  { children?: React.ReactNode }
> {
  public componentDidMount() {
    this.props.requestProfile();
  }

  public render() {
    return (
      <React.Fragment>
        <NavMenu />
        <Main>{this.props.children}</Main>
      </React.Fragment>
    );
  }
}

export default connect(
  (state: ApplicationState) => state.profile, // Selects which state properties are merged into the component's props
  ProfileStore.actionCreators // Selects which action creators are merged into the component's props
)(Layout as any); // eslint-disable-line @typescript-eslint/no-explicit-any
