import Block from "../../tools/Block";
import { default as TitleTemplate } from "./title.hbs?raw";

interface TitleProps {
  title: string;
}

export class Title extends Block {
  constructor(props: TitleProps) {
    super({
      ...props,
    });
  }

  render() {
    return TitleTemplate;
  }
}
