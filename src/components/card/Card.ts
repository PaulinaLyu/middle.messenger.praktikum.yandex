import Block from "../../tools/Block";
import Handlebars from "handlebars";
import { default as CardTemplate } from "./card.hbs?raw";

interface CardProps {
  className?: string;
}

export class Card extends Block {
  constructor(props: CardProps) {
    Handlebars.registerPartial("Card", CardTemplate);

    super({
      ...props,
    });
  }

  render() {
    return CardTemplate;
  }
}
