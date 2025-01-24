import Block from "../../core/Block";

interface ButtonProps {
  onClick?: (value: MouseEvent) => void;
  className?: string;
  text: string;
  page?: string;
  type?: string;
  isCircle?: boolean;
  isGhost?: boolean;
  isWarning?: boolean;
  underline?: boolean;
}

export class Button extends Block {
  constructor(props: ButtonProps) {
    super({
      ...props,
      events: props?.onClick ? { click: props.onClick } : {},
      attr: {
        class: `button ${props.className || ""}${props.isCircle ? " button--circle" : ""}${props.isGhost ? " button--ghost" : ""}${props.isWarning ? "  button--ghost--warning" : ""}${props.underline ? "  button--underline" : ""}`,
        type: props.type || "button",
        page: props.page || "",
      },
    });
  }
  render() {
    return `<button>{{{text}}}</button>`;
  }
}
