import * as React from "react";
import styles from "./Card.module.scss";
import { useDrag, DragSourceMonitor } from "react-dnd";
import { DragTypes } from "../../dnd-types/DragTypes";
import * as Types from "app/games/eucre/types";

interface ICardProps {
  value?: number;
  suit?: Types.Suit;
  id?: string;
  front?: boolean;
  style?: React.CSSProperties;
}

const Card: React.FC<ICardProps> = ({ value, suit, id, front, style }) => {
  var cardContent;
  if (front) {
    cardContent = (
      <div className={styles["cardContent" + suit]} style={style}>
        <div className={styles.cardHeader}>
          {value && displayCardValue(value)}
          <br />
          <span className={styles.icon}></span>
        </div>
        <div className={styles.cardInner}>{gameCardInner(value)}</div>
      </div>
    );
  } else {
    cardContent = <div className={styles.cardBack}></div>;
  }

  return <div className={styles.card}>{cardContent}</div>;
};

function gameCardInner(value?: number) {
  switch (value) {
    case 1:
      return <span className={styles.bigIcon}></span>;
    case 2:
      return iconRows([1, 1]);
    case 3:
      return iconRows([1, 1, 1]);
    case 4:
      return iconRows([2, 2]);
    case 5:
      return iconRows([2, 1, 2]);
    case 6:
      return iconRows([2, 2, 2]);
    case 7:
      return iconRows([2, 1, 2, 2]);
    case 8:
      return iconRows([2, 1, 2, 1, 2]);
    case 9:
      return iconRows([2, 2, 1, 2, 2]);
    case 10:
      return iconRows([2, 1, 2, 2, 1, 2]);
    case 11:
      return <span className={styles.bigIcon}>J</span>;
    case 12:
      return <span className={styles.bigIcon}>♕</span>;
    case 13:
      return <span className={styles.bigIcon}>♔</span>;
    default:
      return null;
  }
}

function iconRows(arr: Array<number>) {
  return arr.map((num: number, index: number) => iconRow(num, index));
}

function iconRow(num: number, key: number) {
  return (
    <div
      key={key}
      className={styles["cardInnerRow " + (num % 2 === 0 ? "Even" : "Odd")]}
    >
      {Array.from(Array(num).keys()).map((x) => (
        <span key={key + "-" + x.toString()} className={styles.icon}></span>
      ))}
    </div>
  );
}

function displayCardValue(value: number) {
  switch (value) {
    case 1:
      return "A";
    case 11:
      return "J";
    case 12:
      return "Q";
    case 13:
      return "K";
    default:
      return value;
  }
}

export default Card;
