import * as React from "react";
import styles from "./Table.module.css";

interface Column {
  name: string;
  key: string;
}

interface IProps {
  columns: Column[];
  data: Array<any>;
}

const Table: React.FC<IProps> = ({ columns, data }) => (
  <table>
    <thead>
      <tr>
        {columns.map((column) => (
          <th>{column.name}</th>
        ))}
      </tr>
      {data.map((row) => (
        <tr>
          {columns.map((field) => (
            <td>{row[field.key]}</td>
          ))}
        </tr>
      ))}
    </thead>
  </table>
);

export default Table;

Table.defaultProps = {};
