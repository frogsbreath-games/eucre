import * as React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import * as EucreStore from "../../store/Eucre";

// At runtime, Redux will merge together...
type EucreProps = EucreStore.EucreState & // ... state we've requested from the Redux store
  typeof EucreStore.actionCreators; // ... plus action creators we've requested

class Eucre extends React.PureComponent<EucreProps> {
  // This method is called when the component is first added to the document
  public componentDidMount() {
    this.ensureDataFetched();
  }

  public render() {
    console.log(this.props.deck);
    return (
      <React.Fragment>
        <div></div>
      </React.Fragment>
    );
  }

  private ensureDataFetched() {
    this.props.requestEucreCards();
  }
}

export default connect(
  (state: ApplicationState) => state.eucre, // Selects which state properties are merged into the component's props
  EucreStore.actionCreators // Selects which action creators are merged into the component's props
)(Eucre as any); // eslint-disable-line @typescript-eslint/no-explicit-any
