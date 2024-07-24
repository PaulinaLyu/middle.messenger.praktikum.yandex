import * as Mocks from "./mocks";
import "./main.scss";
import { LoginPage } from "./pages/loginPage";
import { ProfilePage } from "./pages/profilePage";
import { ErrorPage } from "./pages/errorPage";
import { ChatPage } from "./pages/chatPage";

const pages = {
  chat: new ChatPage({ chatsList: Mocks.chatsListMock, currentChat: 3, chatAvatar: "", chatName: Mocks.chatMock.display_name, chatDate: Mocks.chatMock.chat.date, chat: Mocks.chatMock.chat }),
  login: new LoginPage({
    isRegistration: false,
    onBtnClick: () => console.log("Войти"),
    buttonText: "Войти",
    title: "Вход",
    linkText: "Нет аккаунта?",
    linkPage: "login-registration",
    buttonPage: "chat",
  }),
  "login-registration": new LoginPage({
    isRegistration: true,
    onBtnClick: () => console.log("Регистрация"),
    buttonText: "Зарегистрироваться",
    title: "Регистрация",
    linkText: "Вход",
    linkPage: "login",
    buttonPage: "chat",
  }),
  profile: new ProfilePage({
    user: Mocks.profileMock,
    isChangePass: false,
    disabled: true,
    buttonArrowPage: "chat",
    buttonSavePage: "login",
    buttonExit: "login",
  }),
  error500: new ErrorPage({
    title: "Мы уже фиксим",
    error: "500",
    linkPage: "chat",
    linkText: "Назад к чатам",
  }),
  error404: new ErrorPage({
    title: "Не туда попали",
    error: "404",
    linkPage: "chat",
    linkText: "Назад к чатам",
  }),
};

type pageType = keyof typeof pages;

function navigate(page: pageType) {
  const block = pages[page];
  const container = document.getElementById("app")!;
  if (container) {
    container.innerHTML = ``;
    container.appendChild(block.getContent()!);
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
