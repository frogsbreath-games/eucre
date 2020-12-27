import * as React from "react";
import styles from "./DataTable.module.scss";

interface Column {
  name: string;
  key: string;
}

interface IProps {
  columns: Column[];
  data: Array<any>;
}

const DataTable: React.FC<IProps> = ({ columns, data }) => (
  <table>
    <thead>
      <tr>
        {columns.map((column, index) => (
          <th key={index}>{column.name}</th>
        ))}
      </tr>
      {data.map((row, index) => (
        <tr key={index}>
          {columns.map((field, index) => (
            <td key={index}>{row[field.key]}</td>
          ))}
        </tr>
      ))}
    </thead>
  </table>
);

export default DataTable;

DataTable.defaultProps = {};
