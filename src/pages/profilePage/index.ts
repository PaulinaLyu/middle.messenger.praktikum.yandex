export { default as profilePage } from "./profilePage.hbs?raw";
export { ProfilePage } from "./ProfilePage";
import "./profilePage.scss";

// interface ContextType {
//   a?: boolean;
//   b?: boolean;
//   [key: string]: any;
// }

// Handlebars.registerHelper("if_not_profile", function (this: ContextType, a, b, options: Handlebars.HelperOptions) {
//   const bothFalse = !a && !b;
//   const firstTrueSecondFalse = a && !b;

//   if (bothFalse || firstTrueSecondFalse) {
//     return options.fn(this);
//   } else {
//     return options.inverse(this);
//   }
// });
