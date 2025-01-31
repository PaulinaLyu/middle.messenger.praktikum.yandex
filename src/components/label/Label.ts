import Block from "../../core/Block";

interface LabelProps {
  title: string;
  inputId: string;
  className?: string;
}

export class Label extends Block {
  constructor(props: LabelProps) {
    super({
      ...props,
      title: props.title,
      attr: {
        class: "label" + (props.className || ""),
        for: props.inputId,
      },
    });
  }

  render() {
    return `<label>{{ title }}</label>`;
  }
}
