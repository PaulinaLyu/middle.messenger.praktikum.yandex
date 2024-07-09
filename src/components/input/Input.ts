import Block from "../../tools/Block";
import { default as InputTemplate } from "./input.hbs?raw";

interface InputProps {
  className?: string;
  border?: string;
  nobg?: string;
  circle?: string;
  placeholder?: string;
  name: string;
  id: string;
}

export class Input extends Block {
  constructor(props: InputProps) {
    super({
      ...props,
    });
  }

  render() {
    return InputTemplate;
  }
}
