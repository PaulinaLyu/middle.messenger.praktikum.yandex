import Block from "../../tools/Block";
import Handlebars from "handlebars";
import { default as ProfileItemTemplate } from "./profileItem.hbs?raw";

export class ProfileItem extends Block {
  constructor() {
    super({});
    Handlebars.registerPartial("ProfileItem", ProfileItemTemplate);
  }

  render() {
    return ProfileItemTemplate;
  }
}
