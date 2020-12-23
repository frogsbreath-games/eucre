import * as React from "react";
import * as ReactDOM from "react-dom";
import DataTable from "./DataTable";

const columns = [
  { key: "date", name: "Date" },
  { key: "temperatureC", name: "Temp. (C)" },
  { key: "temperatureF", name: "Temp. (F)" },
  { key: "summary", name: "Summary" },
];
const data = [
  {
    date: "12/25/2020",
    temperatureC: "100.0",
    temperatureF: "212",
    summar: "Boiling",
  },
  {
    date: "12/26/2020",
    temperatureC: "0.0",
    temperatureF: "32",
    summar: "Freezing",
  },
];

it("renders without crashing", () => {
  ReactDOM.render(
    <DataTable columns={columns} data={data} />,
    document.createElement("div")
  );
});
