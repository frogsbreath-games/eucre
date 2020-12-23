import * as React from "react";
import { Route, RouteProps } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home/Home";
import Counter from "./pages/Counter/Counter";
import FetchData from "./pages/FetchData/FetchData";
import EucrePage from "./pages/EucrePage/EucrePage";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

import "./custom.css";

const ProtectedRoute: React.FC<RouteProps> = (props) => (
  <Route
    {...props}
    component={props.component && withAuthenticationRequired(props.component)}
  />
);

export default () => {
  const { isLoading, isAuthenticated } = useAuth0();

  console.log(isAuthenticated);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const layoutProps = {
    isAuthenticated: isAuthenticated,
  };

  return (
    <Layout>
      <Route exact path="/" component={Home} />
      <ProtectedRoute path="/counter" component={Counter} />
      <ProtectedRoute
        path="/fetch-data/:startDateIndex?"
        component={FetchData}
      />
      <ProtectedRoute path="/games/eucre" component={EucrePage} />
    </Layout>
  );
};
