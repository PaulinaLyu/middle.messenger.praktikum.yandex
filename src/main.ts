import Handlebars from "handlebars";
import * as Pages from "./pages";
import * as Components from "./components";
import * as Mocks from "./mocks";
import * as Scripts from "./scripts";
import "./main.scss";

const pages = {
  chat: [Pages.chatPage, Mocks.chatMock, Scripts.chatPageFunc],
  login: [Pages.loginPage, { isRegistration: false }],
  "login-registration": [Pages.loginPage, { isRegistration: true }],
  profile: [Pages.profilePage, { ...Mocks.profileMock, isChangePass: false, isDisabled: true }, Scripts.profilePageFunc],
  "profile-update": [Pages.profilePage, { ...Mocks.profileMock, isChangePass: false, isDisabled: false }, Scripts.profilePageFunc],
  "profile-change-pass": [Pages.profilePage, { ...Mocks.profileMock, isChangePass: true, isDisabled: false }, Scripts.profilePageFunc],
  error500: [Pages.errorPage, { text: "Мы уже фиксим", error: 500 }],
  error404: [Pages.errorPage, { text: "Не туда попали", error: 404 }],
};

type pageType = keyof typeof pages;

Object.entries(Components).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});

function navigate(page: pageType) {
  const [source, context, func] = pages[page];
  const handlebarsFunct = Handlebars.compile(source);
  document.body.innerHTML = handlebarsFunct(context);

  if (typeof func === "function") {
    func();
  }
}

document.addEventListener("DOMContentLoaded", () => navigate("chat"));

document.addEventListener("click", e => {
  const target = e.target as HTMLElement;
  let page = target.getAttribute("page");

  if (!page && target.parentElement) {
    page = (target.parentElement as HTMLElement).getAttribute("page");
  }

  if (page && page in pages) {
    navigate(page as pageType);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
