import Block from "../../tools/Block";

interface ErrorLineProps {
  error: string;
}

export class ErrorLine extends Block {
  constructor(props: ErrorLineProps) {
    super({
      ...props,
      error: props.error,
    });
  }

  render() {
    return `
      <div class="input__error">{{{error}}}</div>
    `;
  }
}
