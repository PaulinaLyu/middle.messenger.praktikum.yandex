import Handlebars from "handlebars";
export { default as chatPage } from "./chatPage.hbs?raw";
import "./chatPage.scss";

Handlebars.registerHelper("chat-page-list", () => {
  return [
    { name: "Андрей", message: "Магическая битва топ", unread: "2" },
    { name: "Маша", message: "Уиииииии" },
    { name: "Ваня", message: "Го в Японию", unread: "4" },
  ];
});
