import Block from "../../tools/Block";

interface InputProps<T> {
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
  validationName?: string;
  validate?: (name: string, value: string) => boolean;
  onChange?: (value: unknown) => void;
  isValid?: boolean;
}

export class Input<T> extends Block {
  constructor(props: InputProps<T>) {
    const events = props.validate
      ? {
          blur: (event: FocusEvent) => {
            const target = event.target as HTMLInputElement;
            const test = props.validate?.(props.validationName || "", target.value as string);
            console.log(test);
            debugger;
            this.setProps({ isValid: props.validate?.(props.validationName || "", target.value as string) });
          },
        }
      : {};
    debugger;
    super({
      ...props,
      events: {
        ...events,
        change: e => {
          // this.setProps({ attr: { value: e.target.value } });
          debugger;
          this.setProps({ value: e.target.value });
          debugger;
        },
      },
      isValid: props.isValid ?? true,
      value: String(props.value || ""),
      attr: {
        class: `${props.className ? `${props.className}` : ""}${props.nobg ? " input__element--no-bg" : ""}${props.isCircle ? " input--circle-border" : ""}${props.border ? " input--border" : ""}${props.isValid ? "" : " input--invalid"}`,
        type: props.type || "text",
        id: String(props.id),
        placeholder: props.placeholder || "",
        name: props.name,
        // value: String(props.value || ""),
        disabled: props.disabled || false,
      },
      search: props.isSearch
        ? '<svg class="input__icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>'
        : "",
    });
  }

  render() {
    return `
      <input value={{value}} />
      {{{search}}}
    `;
  }
}
