import React from "react";
import styles from "./Stack.module.scss";
import * as Types from "app/games/eucre/types";
import Card from "../Card/Card";

interface IProps {
  label: string;
  cards: Types.Card[];
}

const Stack: React.FC<IProps> = ({ label, cards }) => {
  return (
    <div className={styles.container}>
      <div className={styles.body}>
        {cards.map((card, index) => (
          <Card key={index} front={true} {...card} />
        ))}
      </div>
      <label className={styles.label}>
        {label + " Count: " + cards.length}
      </label>
    </div>
  );
};

export default Stack;
