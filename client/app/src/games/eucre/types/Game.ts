import { Card } from "./Card";

export interface Game {
  description: string;
  deck: Card[];
  pile: Card[];
}
