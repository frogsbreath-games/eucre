import React from "react";
import styles from "./Hand.module.scss";
import Card from "../Card/Card";
import * as CardStore from "../../store/Eucre";

interface IHandProps {
  hand: CardStore.Card[];
  onCardClick: () => void;
}

const Hand: React.FunctionComponent<IHandProps> = ({ hand, onCardClick }) => {
  return (
    <div className={styles.handContainer} style={handStyle(hand.length)}>
      {hand.map((card, index) => (
        <div className={styles.card} style={cardStyle(index, hand.length)}>
          <Card
            key={card.suit + card.value}
            value={card.value}
            suit={card.suit}
            clickAction={onCardClick}
            front={true}
          />
        </div>
      ))}
    </div>
  );
};

function cardStyle(index: number, count: number) {
  var maxDegrees = Math.min(2 * count, 30);
  var degreeDiff = maxDegrees / count;
  var rotation = index * degreeDiff - maxDegrees / 2 + 0.5 * degreeDiff;

  //this is far less scientific than it looks
  var yTranslate = 720 * Math.pow(Math.sin((rotation * Math.PI) / 180.0), 2);

  var percentLeft =
    (100 * Math.cos((rotation * Math.PI) / 180) * (index - count / 2 + 0.5)) /
      count +
    50;

  return {
    left: percentLeft + "%",
    transform: "translateY(" + yTranslate + "px) rotate(" + rotation + "deg)",
  };
}

function handStyle(count: number) {
  return {
    width: 75 * count + "px",
  };
}

export default Hand;
