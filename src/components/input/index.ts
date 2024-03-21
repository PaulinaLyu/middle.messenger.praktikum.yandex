import Handlebars from "handlebars";
import "./input.scss";
export { default as Input } from "./input.hbs?raw";

Handlebars.registerHelper(
  "if_type_search",
  function (type: string, options: Handlebars.HelperOptions) {
    if (type === "search") {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  }
);
