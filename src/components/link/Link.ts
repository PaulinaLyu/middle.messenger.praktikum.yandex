import Block from "../../tools/Block";
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
  }

  render() {
    return LinkTemplate;
  }
}
