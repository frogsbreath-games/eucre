import * as React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "app/store";
import styles from "./Profile.module.scss";
import * as ProfileStore from "app/store/Profile";

// At runtime, Redux will merge together...
type ProfileProps = ProfileStore.ProfileState & // ... state we've requested from the Redux store
  typeof ProfileStore.actionCreators; // ... plus action creators we've requested

class Profile extends React.PureComponent<ProfileProps> {
  // This method is called when the component is first added to the document
  public componentDidMount() {
    this.props.requestProfile();
  }
  public render() {
    console.log(this.props.profile);
    return (
      <React.Fragment>
        <h1>Profile</h1>
        <h3>Username: {this.props.profile.username}</h3>
      </React.Fragment>
    );
  }
}

export default connect(
  (state: ApplicationState) => state.profile, // Selects which state properties are merged into the component's props
  ProfileStore.actionCreators // Selects which action creators are merged into the component's props
)(Profile as any); // eslint-disable-line @typescript-eslint/no-explicit-any
