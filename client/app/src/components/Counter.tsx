import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { formatDiagnosticsWithColorAndContext } from "typescript";
import { ApplicationState } from "../store";
import * as CounterStore from "../store/Counter";
import { Button } from "../ui";

type CounterProps = CounterStore.CounterState &
  typeof CounterStore.actionCreators &
  RouteComponentProps<{}>;

class Counter extends React.PureComponent<CounterProps> {
  public render() {
    return (
      <React.Fragment>
        <h1>Counter</h1>

        <p>This is a simple example of a React component.</p>

        <p aria-live="polite">
          Current count: <strong>{this.props.count}</strong>
        </p>

        <Button
          variant="blue"
          type="button"
          onClick={() => {
            this.props.increment();
          }}
        >
          Increment
        </Button>
      </React.Fragment>
    );
  }
}

export default connect(
  (state: ApplicationState) => state.counter,
  CounterStore.actionCreators
)(Counter);
