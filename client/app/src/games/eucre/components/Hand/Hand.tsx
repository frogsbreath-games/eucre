import React from "react";
import styles from "./Hand.module.scss";
import Card from "../Card/Card";
import DragWrapper from "../Droppable/DragWrapper";
import * as Types from "app/games/eucre/types";
import { DragTypes } from "../../dnd-types/DragTypes";

interface IHandProps {
  revealed?: boolean;
  hand: Types.Card[];
  cardAction?: (card: Types.Card) => void;
}

const Hand: React.FunctionComponent<IHandProps> = ({
  hand,
  cardAction,
  revealed,
}) => {
  return (
    <div className={styles.handContainer} style={handStyle(hand.length)}>
      {hand.map((card, index) => (
        <div
          key={index}
          className={styles.card}
          style={cardStyle(index, hand.length)}
        >
          <DragWrapper
            dropAction={cardAction ? () => cardAction(card) : undefined}
            dragType={DragTypes.CARD}
          >
            <Card
              key={card.suit + card.value}
              value={card.value}
              suit={card.suit}
              front={revealed ? true : false}
            />
          </DragWrapper>
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
    // TODO Fix dynamic width
    // width changing on hand components is making parent div change size causing board jump
    // width: 75 * count + "px",
    width: "175px",
  };
}

export default Hand;
