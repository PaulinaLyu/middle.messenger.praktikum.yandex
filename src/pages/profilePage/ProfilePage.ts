//@ts-nocheck
import Block from "../../tools/Block";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { InputField } from "../../components/inputField";
import { InputFile } from "../../components/inputFile";
import { Modal } from "../../components/modal";
import { ProfileItem } from "../../components";
import { default as ProfilePageTemplate } from "./profilePage.hbs?raw";

export class ProfilePage extends Block {
  constructor(props) {
    super({
      ...props,
      modal: new Modal(),
      input: new Input(),
      inputField: new InputField(),
      button: new Button({ onClick: props.onBtnClick }),
      inputFile: new InputFile(),
      profileItem: new ProfileItem(),
    });
  }

  render() {
    return ProfilePageTemplate;
  }
}
