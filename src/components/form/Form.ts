import Block from "../../tools/Block";
import { Button } from "../button";
import { Link } from "../link";
import { Title } from "../title";

interface FormProps {
  className?: string;
  formTitle?: string;
  buttonText?: string;
  buttonPage?: string;
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
            page: props.linkPage || "",
          })
        : "",
      linkReturn: props.linkText
        ? new Link({
            text: "Вернуться к стр чатов",
            page: "chat",
          })
        : "",

      children: props.children,
    });
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
