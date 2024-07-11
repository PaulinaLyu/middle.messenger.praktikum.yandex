import Block from "../../tools/Block";
import Handlebars from "handlebars";
import { default as InputFieldTemplate } from "./inputField.hbs?raw";

interface InputFieldProps {
  className?: string;
  title: string;
  inputId: string;
  input: Block;
}

export class InputField extends Block {
  constructor(props: InputFieldProps) {
    super({
      ...props,
    });
    Handlebars.registerPartial("InputField", InputFieldTemplate);
  }

  render() {
    return InputFieldTemplate;
  }
}
