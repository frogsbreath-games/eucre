import * as React from "react";
import { connect } from "react-redux";
import Card from "./Card/Card";

const Home = () => (
  <div>
    <h1>Eucre</h1>
    <Card front={true} value={7} suit="Hearts" />
  </div>
);

export default connect()(Home);
