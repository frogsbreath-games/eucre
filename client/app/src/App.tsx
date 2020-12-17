import * as React from "react";
import { Route } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home/Home";
import Counter from "./pages/Counter/Counter";
import FetchData from "./pages/FetchData/FetchData";
import Eucre from "./pages/Eucre/Eucre";

import "./custom.css";

export default () => (
  <Layout>
    <Route exact path="/" component={Home} />
    <Route path="/counter" component={Counter} />
    <Route path="/fetch-data/:startDateIndex?" component={FetchData} />
    <Route path="/eucre" component={Eucre} />
  </Layout>
);
