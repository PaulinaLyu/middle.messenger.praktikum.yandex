//@ts-nocheck
import Block from "../../tools/Block";
import { Card } from "../../components/card";
import { Link } from "../../components/link";
import { default as LoginPageTemplate } from "./loginPage.hbs?raw";

export class LoginPage extends Block {
  constructor(props) {
    super({
      ...props,
      card: new Card(),
      link: new Link({ text: props.text, url: props.url }),
    });
  }

  render() {
    return LoginPageTemplate;
  }
}

class PageWithButton extends Block {
  constructor(props) {
    super({
      ...props, //{buttonText: 'Button'}
      button: new Button({ text: props.buttonText }),
      input: new Input({
        label: "input",
        onChange: value => {
          this.setProps({ buttonText: value });
        },
      }),
    });
  }

  componentDidUpdate(oldProps, newProps) {
    if (oldProps.buttonText !== newProps.buttonText) {
      this.children.button.setProps({ text: newProps.buttonText });
    }
    return true;
  }

  override render() {
    return "<div>{{{ button }}} {{{ input }}}</div>";
  }
}
