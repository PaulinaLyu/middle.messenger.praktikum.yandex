import Block from "../../tools/Block";
import { default as ButtonTemplate } from "./button.hbs?raw";

interface ButtonProps {
  onClick: (value: MouseEvent) => void;
  className: string;
  text: string;
  page: string;
  type: string;
}

export class Button extends Block {
  constructor(props: ButtonProps) {
    super({
      ...props,
      events: {
        click: (e: MouseEvent) => props.onClick(e),
      },
    });
  }

  render() {
    return ButtonTemplate;
  }
}
