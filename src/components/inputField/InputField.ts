import Block from "../../tools/Block";
import { Label } from "../../components/label";
import { Input } from "../../components/input";

interface InputFieldProps<T> {
  className?: string;
  inputClassName?: string;
  isCircle?: boolean;
  nobg?: boolean;
  placeholder?: string;
  name: string;
  title: string;
  id: string;
  type?: string;
  value?: T;
  isSearch?: boolean;
  border?: boolean;
  isValid?: boolean;
  validationName?: string;
  validate?: (name: string, value: string) => boolean;
}
export class InputField<T> extends Block {
  constructor(props: InputFieldProps<T>) {
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
        value: props?.value,
        type: props.type,
        border: props.border,
        validate: props.validate,
        validationName: props.validationName,
        isValid: props.isValid ?? true,
      }),
    });
  }

  render() {
    return `<div class="input-field">{{{label}}}{{{input}}}</div>`;
  }
}
