import Handlebars from "handlebars";
export { default as chatPage } from "./chatPage.hbs?raw";
import "./chatPage.scss";

Handlebars.registerHelper("chat-page-list", () => {
  return [
    {
      name: "Андрей",
      message:
        "Магическая битва топМагическая битва топМагическая битва топМагическая битва топМагическая битва топМагическая битва топ",
      unread: "2",
      date: "10:40",
    },
    { name: "Маша", message: "Уиииииии", date: "пн" },
    { name: "Ваня", message: "Го в Японию", unread: "4", date: "12:00" },
  ];
});
