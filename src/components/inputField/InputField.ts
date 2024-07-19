import Block from "../../tools/Block";
import { Label } from "../../components/label";
import { Input } from "../../components/input";

interface InputFieldProps {
  className?: string;
  inputClassName?: string;
  isCircle?: boolean;
  nobg?: boolean;
  placeholder?: string;
  name: string;
  title: string;
  id: string;
  type?: string;
  isSearch?: boolean;
}
export class InputField extends Block {
  constructor(props: InputFieldProps) {
    super({
      ...props,
      attr: {
        class: `input-field ${props.className || ""}`,
      },
      label: new Label({ inputId: props.id, title: props.title }),
      input: new Input({
        className: props.inputClassName,
        isCircle: props.isCircle,
        nobg: props.nobg,
        placeholder: props.placeholder,
        name: props.name,
        id: props.id,
        type: props.type,
      }),
    });
  }

  render() {
    return `<div>{{{label}}}{{{input}}}</div>`;
  }
}

// {{> Input id=inputId placeholder=placeholder name=name type=type}}
