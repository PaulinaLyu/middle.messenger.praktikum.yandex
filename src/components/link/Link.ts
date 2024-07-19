import Block from "../../tools/Block";
import Handlebars from "handlebars";
import { default as LinkTemplate } from "./link.hbs?raw";

interface LinkProps {
  text: string;
  className?: string;
  secondary?: string;
  type: string;
  page: string;
}

export class Link extends Block {
  constructor(props: LinkProps) {
    super({
      ...props,
      text: props.text,
      attr: {
        class: `link ${props.className || ""}${props.secondary ? " link--secondary" : ""}`,
        page: props.page,
      },
    });
  }

  render() {
    return `<a>{{ text }}</a>`;
  }
}
