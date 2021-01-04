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
  <table className={styles.table}>
    <thead>
      <tr className={styles.tr}>
        {columns.map((column, index) => (
          <th className={styles.th} key={index}>
            {column.name}
          </th>
        ))}
      </tr>
      {data.map((row, index) => (
        <tr className={styles.tr} key={index}>
          {columns.map((field, index) => (
            <td className={styles.td} key={index}>
              {row[field.key]}
            </td>
          ))}
        </tr>
      ))}
    </thead>
  </table>
);

export default DataTable;

DataTable.defaultProps = {};
