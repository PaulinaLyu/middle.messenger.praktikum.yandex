import Block from "../../tools/Block";
import Handlebars from "handlebars";
import { default as CardTemplate } from "./card.hbs?raw";

interface CardProps {
  className?: string;
}

export class Card extends Block {
  constructor(props: CardProps) {
    super({
      ...props,
    });
    Handlebars.registerPartial("Card", CardTemplate);
  }

  render() {
    return CardTemplate;
  }
}
