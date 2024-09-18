import Block, { Props } from "../../tools/Block";
import { Button } from "../button";
import { Link } from "../link";
import { Title } from "../title";

interface FormProps {
  className?: string;
  formTitle?: string;
  buttonText?: string;
  children: Block[];
  linkText?: string;
  linkPage?: string;
  isFooter?: boolean;
  onSubmit: (e: Event) => void;
}

export class Form extends Block {
  constructor(props: FormProps) {
    super({
      ...props,
      events: {
        submit: e => props.onSubmit(e),
      },
      attr: {
        class: props.className || "",
      },
      isFooter: props.isFooter ?? true,
      button: new Button({ text: props.buttonText || "", type: "submit" }),
      title: new Title({ title: props.formTitle || "" }),
      link: props.linkText
        ? new Link({
            text: props.linkText,
            url: props.linkPage || "",
          })
        : "",
      children: props.children,
    });
  }

  componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    if (oldProps === newProps) {
      return false;
    }

    if (oldProps.children !== newProps.children) {
      this.setProps({ children: newProps.children });
    }

    return true;
  }

  render() {
    return `<form>
              ${this.props.formTitle ? `{{{title}}}` : ""}
                {{{children}}}
              ${
                this.props.isFooter
                  ? `<div class="form__footer">
                {{{button}}}
                {{{link}}}
                {{{linkReturn}}}
              </div>`
                  : ""
              }
            </form>`;
  }
}
