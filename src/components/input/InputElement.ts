import Block, { BlockProps } from "../../core/Block";
import { IValidationReturn } from "../../utils";
import { ErrorLine } from "./ErrorLine";
import { Input } from "./Input";

interface InputElementProps<T> {
  className?: string;
  border?: boolean;
  nobg?: boolean;
  isCircle?: boolean;
  placeholder?: string;
  name: string;
  id: string | number;
  type?: string;
  isSearch?: boolean;
  value?: T;
  disabled?: boolean;
  onChange?: (value: KeyboardEvent) => void;
  validationName?: string;
  validate?: (name: string, value: string) => IValidationReturn;
  error?: string;
}

export class InputElement<T> extends Block {
  constructor(props: InputElementProps<T>) {
    super({
      errorLine: new ErrorLine({
        error: props.error || "",
      }),
      input: new Input({
        className: props.className,
        isCircle: props.isCircle,
        disabled: props.disabled,
        nobg: props.nobg,
        placeholder: props.placeholder,
        name: props.name,
        id: props.id,
        value: props?.value,
        type: props.type,
        border: props.border,
        onBlur: (event: FocusEvent) => {
          const target = event.target as HTMLInputElement;

          if (props.validate) {
            const { isValid, errorMessage } = props.validate(props.validationName || "", target.value as string);
            const classLine = {
              className: isValid ? target?.className.split(" input--invalid").join("") : target?.className.includes("input--invalid") ? target?.className : target?.className + " input--invalid",
            };

            this.setProps({ error: errorMessage, value: target.value, ...classLine });
          } else {
            this.setProps({ value: target.value });
          }
        },
      }),
    });
  }

  render() {
    return `
      <div class="input__error__container">
        {{{input}}}
        {{{errorLine}}}
      </div>
    `;
  }
}
