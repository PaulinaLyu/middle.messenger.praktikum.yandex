import Block from "../../tools/Block";
import Handlebars from "handlebars";
import { default as LinkTemplate } from "./link.hbs?raw";

interface LinkProps {
  className?: string;
  url: string;
  text: string;
  secondary?: string;
  page?: string;
}

export class Link extends Block {
  constructor(props: LinkProps) {
    super({
      ...props,
    });
    Handlebars.registerPartial("Link", LinkTemplate);
  }

  render() {
    return LinkTemplate;
  }
}
