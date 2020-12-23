import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { ApplicationState } from "app/store";
import * as WeatherForecastsStore from "app/store/WeatherForecasts";
import { DataTable } from "app/ui";

// At runtime, Redux will merge together...
type WeatherForecastProps = WeatherForecastsStore.WeatherForecastsState & // ... state we've requested from the Redux store
  typeof WeatherForecastsStore.actionCreators & // ... plus action creators we've requested
  RouteComponentProps<{ startDateIndex: string }>; // ... plus incoming routing parameters

class FetchData extends React.PureComponent<WeatherForecastProps> {
  // This method is called when the component is first added to the document
  public componentDidMount() {
    this.ensureDataFetched();
  }

  // This method is called when the route parameters change
  public componentDidUpdate() {
    this.ensureDataFetched();
  }

  public render() {
    return (
      <React.Fragment>
        <h1 id="tabelLabel">Weather forecast</h1>
        <p>
          This component demonstrates fetching data from the server and working
          with URL parameters.
        </p>
        {this.renderForecastsTable()}
        {this.renderPagination()}
      </React.Fragment>
    );
  }

  private ensureDataFetched() {
    const startDateIndex =
      parseInt(this.props.match.params.startDateIndex, 10) || 0;
    this.props.requestWeatherForecasts(startDateIndex);
  }

  private renderForecastsTable() {
    return (
      <div>
        <DataTable
          columns={[
            { key: "date", name: "Date" },
            { key: "temperatureC", name: "Temp. (C)" },
            { key: "temperatureF", name: "Temp. (F)" },
            { key: "summary", name: "Summary" },
          ]}
          data={this.props.forecasts}
        />
      </div>
    );
  }

  private renderPagination() {
    const prevStartDateIndex = (this.props.startDateIndex || 0) - 5;
    const nextStartDateIndex = (this.props.startDateIndex || 0) + 5;

    return (
      <div className="">
        <Link className="" to={`/fetch-data/${prevStartDateIndex}`}>
          Previous
        </Link>
        {this.props.isLoading && <span>Loading...</span>}
        <Link className="" to={`/fetch-data/${nextStartDateIndex}`}>
          Next
        </Link>
      </div>
    );
  }
}

export default connect(
  (state: ApplicationState) => state.weatherForecasts, // Selects which state properties are merged into the component's props
  WeatherForecastsStore.actionCreators // Selects which action creators are merged into the component's props
)(FetchData as any); // eslint-disable-line @typescript-eslint/no-explicit-any
