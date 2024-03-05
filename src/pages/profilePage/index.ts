import Handlebars from "handlebars";
export { default as profilePage } from "./profilePage.hbs?raw";
import "./profilePage.scss";

Handlebars.registerHelper("profile-page-content", () => {
  return [
    {
      email: "pochta@yandex.ru",
      login: "ivanivanov",
      name: "Иван",
      first_name: "Иванов",
      display_name: "Иван",
      phone: "+7 (909) 967 30 30",
    },
  ];
});
