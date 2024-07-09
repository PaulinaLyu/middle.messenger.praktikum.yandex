import Handlebars from "handlebars";
import "./input.scss";
export { Input } from "./Input.ts";

interface ContextType {
  type: string;
  [key: string]: any;
}

Handlebars.registerHelper("if_type_search", function (this: ContextType, type: string, options: Handlebars.HelperOptions) {
  if (type === "search") {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});
