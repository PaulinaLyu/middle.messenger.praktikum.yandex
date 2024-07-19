import Block from "../../tools/Block";
// import Handlebars from "handlebars";
// import { default as ButtonTemplate } from "./button.hbs?raw";

interface ButtonProps {
  onClick: (value: MouseEvent) => void;
  className: string;
  text: string;
  page: string;
  type: string;
  isCircle: boolean;
}

export class Button extends Block {
  constructor(props: ButtonProps) {
    super({
      ...props,
      events: {
        click: (e: MouseEvent) => {
          props.onClick(e);
        },
      },
      attr: {
        class: `button ${props.className || ""}${props.isCircle ? " button--circle" : ""}`,
        type: props.type,
        page: props.page,
      },
    });
  }

  render() {
    return `<button>{{text}}</button>`;
  }
}
