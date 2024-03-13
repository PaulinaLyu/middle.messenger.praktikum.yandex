import Handlebars from "handlebars";
import * as Pages from "./pages";
import * as Components from "./components";
import "./main.scss";

const cont = {
  email: "pochta@yandex.ru",
  login: "ivanivanov",
  name: "Иван",
  first_name: "Иванов",
  display_name: "Иван",
  phone: "+7 (909) 967 30 30",
};

const pages = {
  chat: [Pages.chatPage],
  login: [Pages.loginPage],
  profile: [Pages.profilePage, cont],
};

type pageType = keyof typeof pages;

Object.entries(Components).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});

function navigate(page: pageType) {
  const [source, context] = pages[page];
  const handlebarsFunct = Handlebars.compile(source);
  document.body.innerHTML = handlebarsFunct(context);
}

document.addEventListener("DOMContentLoaded", () => navigate("chat"));

document.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  const page = target.getAttribute("page");
  if (page && page in pages) {
    navigate(page as pageType);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
