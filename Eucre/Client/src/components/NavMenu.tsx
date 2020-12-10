import * as React from "react";

export default class NavMenu extends React.PureComponent<{}> {
  public render() {
    return (
      <header>
        <div>
          <ul>
            <a href="/">Eucre</a>
            <a href="/counter">Counter</a>
            <a href="/fetch-data">Fetch data</a>
          </ul>
        </div>
      </header>
    );
  }
}
