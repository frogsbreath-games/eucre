import * as React from "react";
import { connect } from "react-redux";
import Card from "./Card/Card";

const Home = () => (
  <div>
    <h1>Eucre</h1>
    <Card />
  </div>
);

export default connect()(Home);
