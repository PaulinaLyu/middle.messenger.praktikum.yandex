import Handlebars from "handlebars";
export { default as profilePage } from "./profilePage.hbs?raw";
import "./profilePage.scss";

Handlebars.registerHelper("if_not_profile", function (a, b, options) {
  const bothFalse = a === false && b === false;
  const firstTruesecondFalse = a === true && b === false;
  debugger;
  if (bothFalse || firstTruesecondFalse) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});
