import Block from "../../tools/Block";

interface LinkProps {
  text: string;
  className?: string;
  secondary?: string;
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
