//@ts-nocheck
import Block from "../../tools/Block";
import { Card } from "../../components/card";
import { Link } from "../../components/link";
import { Button } from "../../components/button";
import { Title } from "../../components/title";
import { Input } from "../../components/input";
import { InputField } from "../../components/inputField";
import { default as LoginPageTemplate } from "./loginPage.hbs?raw";

export class LoginPage extends Block {
  constructor(props) {
    super({
      ...props,
      card: new Card(),
      title: new Title(),
      input: new Input(),
      inputField: new InputField(),
      button: new Button(),
      link: new Link({ text: props.text, url: props.url }),
    });
  }

  render() {
    return LoginPageTemplate;
  }
}
