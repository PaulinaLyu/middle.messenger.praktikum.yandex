import Block from "../../tools/Block";
import Handlebars from "handlebars";
import { default as InputFileTemplate } from "./inputFile.hbs?raw";

export class InputFile extends Block {
  constructor() {
    super({});
    Handlebars.registerPartial("InputFile", InputFileTemplate);
  }

  render() {
    return InputFileTemplate;
  }
}
