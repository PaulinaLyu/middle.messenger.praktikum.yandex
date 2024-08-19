import Block from "../../tools/Block";
import { Button } from "../button";
import { Link } from "../link";
import { Title } from "../title";

interface FormProps {
  className?: string;
  formTitle?: string;
  buttonText: string;
  buttonPage?: string;
  children: Block[];
  linkText?: string;
  linkPage?: string;
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
      button: new Button({ text: props.buttonText, type: "submit", onClick: () => console.log("123") }),
      title: new Title({ title: props.formTitle || "" }),
      link: props.linkText
        ? new Link({
            text: props.linkText,
            page: props.linkPage || "",
          })
        : "",
      children: props.children,
    });
  }

  render() {
    return `<form>
              <div class="login-form__body">
                {{{title}}}
                {{{children}}}
              </div>
              <div>
                {{{button}}}
                {{{link}}}
              </div>
            </form>`;
  }
}
