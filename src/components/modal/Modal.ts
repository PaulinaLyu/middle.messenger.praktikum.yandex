import Block from "../../tools/Block";
import Handlebars from "handlebars";
import { default as ModalTemplate } from "./modal.hbs?raw";

export class Modal extends Block {
  constructor() {
    super({});
    Handlebars.registerPartial("Modal", ModalTemplate);
  }

  render() {
    return ModalTemplate;
  }
}
