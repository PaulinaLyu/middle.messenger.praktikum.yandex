import * as Mocks from "./mocks";
import "./main.scss";
import { Router } from "./tools/Router";
import { ErrorPage, ChatPage, ProfilePage, LoginPage } from "./pages";
import { Store } from "./tools/Store";

const router = new Router("#app");
window.router = router;

window.store = new Store({
  isLoadingUser: false,
  user: null,
  errorUser: "",
});

router
  .use(
    "/",
    new LoginPage({
      isRegistration: false,
      buttonText: "Войти",
      title: "Вход",
      linkText: "Нет аккаунта?",
      linkPage: "sign-up",
    }),
  )
  .use(
    "/sign-up",
    new LoginPage({
      isRegistration: true,
      buttonText: "Зарегистрироваться",
      title: "Регистрация",
      linkText: "Вход",
      linkPage: "/",
    }),
  )
  .use(
    "/messenger",
    new ChatPage({ chatsList: Mocks.chatsListMock, currentChat: 3, chatAvatar: "", chatName: Mocks.chatMock.display_name, chatDate: Mocks.chatMock.chat.date, chat: Mocks.chatMock.chat }),
  )
  .use(
    "/settings",
    new ProfilePage({
      user: Mocks.profileMock,
      isChangePass: false,
      disabled: true,
      isShowModal: false,
    }),
  )
  .use(
    "*",
    new ErrorPage({
      title: "Не туда попали",
      error: "404",
      linkPage: "messenger",
      linkText: "Назад к чатам",
    }),
  )
  .start();

// const pages = {
//   chat: () => new ChatPage({ chatsList: Mocks.chatsListMock, currentChat: 3, chatAvatar: "", chatName: Mocks.chatMock.display_name, chatDate: Mocks.chatMock.chat.date, chat: Mocks.chatMock.chat }),
//   login: () =>
//     new LoginPage({
//       isRegistration: false,
//       buttonText: "Войти",
//       title: "Вход",
//       linkText: "Нет аккаунта?",
//       linkPage: "login-registration",
//       buttonPage: "chat",
//     }),
//   "login-registration": () =>
//     new LoginPage({
//       isRegistration: true,
//       onBtnClick: () => console.log("Регистрация"),
//       buttonText: "Зарегистрироваться",
//       title: "Регистрация",
//       linkText: "Вход",
//       linkPage: "login",
//       buttonPage: "chat",
//     }),
//   profile: () =>
//     new ProfilePage({
//       user: Mocks.profileMock,
//       isChangePass: false,
//       disabled: true,
//       buttonArrowPage: "chat",
//       buttonExit: "login",
//       isShowModal: false,
//     }),
//   "profile-edit": () =>
//     new ProfilePage({
//       user: Mocks.profileMock,
//       isChangePass: false,
//       disabled: false,
//       buttonArrowPage: "profile",
//       buttonExit: "login",
//       isShowModal: false,
//     }),
//   "profile-change-pass": () =>
//     new ProfilePage({
//       user: Mocks.profileMock,
//       isChangePass: true,
//       disabled: false,
//       buttonArrowPage: "profile",
//       buttonExit: "login",
//       isShowModal: false,
//     }),
//   error500: () =>
//     new ErrorPage({
//       title: "Мы уже фиксим",
//       error: "500",
//       linkPage: "chat",
//       linkText: "Назад к чатам",
//     }),
//   error404: () =>
//     new ErrorPage({
//       title: "Не туда попали",
//       error: "404",
//       linkPage: "chat",
//       linkText: "Назад к чатам",
//     }),
// };

// function returnPage(page: pageType) {
//   return pages[page]();
// }

// type pageType = keyof typeof pages;

// function navigate(page: pageType) {
//   const block = returnPage(page);
//   debugger;
//   const container = document.getElementById("app")!;
//   if (container) {
//     debugger;
//     container.innerHTML = ``;
//     container.appendChild(block.getContent()!);
//   }
// }

// document.addEventListener("DOMContentLoaded", () => navigate("chat"));

// document.addEventListener("click", e => {
//   const target = e.target as HTMLElement;
//   let page = target.getAttribute("page");
//   if (!page && target.parentElement) {
//     page = (target.parentElement as HTMLElement).getAttribute("page");
//   }

//   if (page && page in pages) {
//     navigate(page as pageType);
//     e.preventDefault();
//     e.stopImmediatePropagation();
//   }
// });
