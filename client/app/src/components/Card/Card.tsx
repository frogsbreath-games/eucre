import * as React from "react";
import styles from "./Card.module.css";

interface ICardProps {
  value?: number;
  suit?: string;
  id?: string;
  clickAction?: () => void;
  front?: boolean;
}

export default class Cardextends extends React.PureComponent<ICardProps> {
  render() {
    return <div className={styles.card}></div>;
  }
}
