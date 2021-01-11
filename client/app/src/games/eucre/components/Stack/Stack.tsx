import React from "react";
import styles from "./Stack.module.scss";
import * as Types from "app/games/eucre/types";
import Card from "../Card/Card";

interface IProps {
  cards: Types.Card[];
}

const Stack: React.FC<IProps> = ({ cards }) => {
  return (
    <div className={styles.container}>
      <div className={styles.body}>
        {cards &&
          cards.slice(Math.max(cards.length - 5, 0)).map((card, index) => (
            <div key={index} className={styles.card}>
              <Card key={index} front={true} {...card} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Stack;
