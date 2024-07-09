import Block from "../../tools/Block";
import { default as CardTemplate } from "./card.hbs?raw";

interface CardProps {
  className?: string;
}

export class Card extends Block {
  constructor(props: CardProps) {
    super({
      ...props,
    });
  }

  render() {
    return CardTemplate;
  }
}
