import { Input } from "..";
import Block from "../../tools/Block";

interface ProfileItemProps<T> {
  label: string;
  name: string;
  value?: T;
  type?: string;
  disabled: boolean;
  validationName?: string;
  validate?: (name: string, value: string) => boolean;
}

export class ProfileItem<T> extends Block {
  constructor(props: ProfileItemProps<T>) {
    super({
      ...props,
      input: new Input({
        className: "profileItem__value",
        disabled: props.disabled,
        name: props.name,
        id: props.name,
        value: props.value,
        type: props.type,
        nobg: true,
        validationName: props.validationName,
        validate: props.validate,
      }),
    });
  }

  render() {
    return `<div class="profileItem">
      <div class="profileItem__label">{{ label }}</div>
      {{{input}}}
    </div>`;
  }
}
