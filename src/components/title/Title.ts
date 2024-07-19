import Block from "../../tools/Block";
import Handlebars from "handlebars";
import { default as TitleTemplate } from "./title.hbs?raw";

interface TitleProps {
  title: string;
}

export class Title extends Block {
  constructor(props: TitleProps) {
    super({
      ...props,
      title: props.title,
    });
  }

  render() {
    return `<h1 class="page-title">
        {{title}}
      </h1>`;
  }
}
