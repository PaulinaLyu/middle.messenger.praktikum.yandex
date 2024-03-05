import Handlebars from "handlebars";
import * as Pages from "./pages";

const pages = {
  chat: [Pages.chatPage],
  login: [Pages.loginPage],
};

type pageType = keyof typeof pages;

function navigate(page: pageType) {
  const [source] = pages[page];
  const handlebarsFunct = Handlebars.compile(source);
  document.body.innerHTML = handlebarsFunct({});
}

document.addEventListener("DOMContentLoaded", () => navigate("login"));

document.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  const page = target.getAttribute("page");
  if (page && page in pages) {
    navigate(page as pageType);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
