import Handlebars from "handlebars";
import * as Pages from "./pages";
import * as Components from "./components";
import * as Mocks from "./mocks";
import * as Scripts from "./scripts";
import "./main.scss";
import { LoginPage } from "./pages/loginPage";
import { ProfilePage } from "./pages/profilePage";

// const pages = {
//   chat: [Pages.chatPage, Mocks.chatMock, Scripts.chatPageFunc],
//   login: [Pages.loginPage, { isRegistration: false }],
//   "login-registration": [Pages.loginPage, { isRegistration: true }],
//   profile: [Pages.profilePage, { ...Mocks.profileMock, isChangePass: false, isDisabled: true }, Scripts.profilePageFunc],
//   "profile-update": [Pages.profilePage, { ...Mocks.profileMock, isChangePass: false, isDisabled: false }, Scripts.profilePageFunc],
//   "profile-change-pass": [Pages.profilePage, { ...Mocks.profileMock, isChangePass: true, isDisabled: false }, Scripts.profilePageFunc],
//   error500: [Pages.errorPage, { text: "Мы уже фиксим", error: 500 }],
//   error404: [Pages.errorPage, { text: "Не туда попали", error: 404 }],
// };

// type pageType = keyof typeof pages;

// Object.entries(Components).forEach(([name, component]) => {
//   Handlebars.registerPartial(name, component);
// });

// function navigate(page: pageType) {
//   const [source, context, func] = pages[page];
//   const handlebarsFunct = Handlebars.compile(source);
//   document.body.innerHTML = handlebarsFunct(context);

//   if (typeof func === "function") {
//     func();
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

// //@ts-nocheck
// import Block from "./tools/Block";

// class ChatItem extends Block {
//   constructor({ ...props }) {
//     super({
//       ...props,
//     });
//   }

//   render() {
//     return `
//       <div>
//         <div>{{ name }}</div>
//         <div>{{ message }}</div>
//       </div>`;
//   }
// }

// class Button extends Block {
//   constructor(props) {
//     super({
//       ...props,
//       events: {
//         click: () => console.log("event"),
//       },
//       attr: {
//         class: `fake`,
//       },
//     });
//   }

//   render() {
//     return "<button>{{text}}</button>";
//   }
// }

// class Input extends Block {
//   constructor(props) {
//     super({
//       ...props,
//       events: {
//         change: e => props.onChange(e.target.value),
//         blur: e => this.validate(),
//       },
//     });
//   }

//   render() {
//     return `<input />`;
//   }

//   validate() {
//     console.log("Here we call validation code on blur");
//   }
// }

// class PageWithButton extends Block {
//   constructor(props) {
//     super({
//       ...props, //{buttonText: 'Button'}
//       button: new Button({ text: props.buttonText }),
//       input: new Input({
//         label: "input",
//         onChange: value => {
//           this.setProps({ buttonText: value });
//         },
//       }),
//     });
//   }

//   componentDidUpdate(oldProps, newProps) {
//     if (oldProps.buttonText !== newProps.buttonText) {
//       this.children.button.setProps({ text: newProps.buttonText });
//     }
//     return true;
//   }

//   override render() {
//     return "<div>{{{ button }}} {{{ input }}}</div>";
//   }
// }

// class PageWithList extends Block {
//   constructor(props) {
//     super({
//       ...props, //{buttonText: 'Button'}
//       lists: [
//         new ChatItem({ name: "Samanta Smith", message: "Алло, на!" }),
//         new ChatItem({ name: "John Dow 1", message: "What?" }),
//         new ChatItem({ name: "John Dow 2", message: "What?" }),
//         new ChatItem({ name: "John Dow 3", message: "What?" }),
//         new ChatItem({ name: "John Dow 4", message: "What?" }),
//         new ChatItem({ name: "John Dow 5", message: "What?" }),
//         new ChatItem({ name: "John Dow 6", message: "What?" }),
//         new ChatItem({ name: "John Dow", message: "What?" }),
//         new ChatItem({ name: "John Dow", message: "What?" }),
//         new ChatItem({ name: "John Dow", message: "What?" }),
//         new ChatItem({ name: "John Dow", message: "What?" }),
//         new ChatItem({ name: "Samanta Smith", message: "Алло, на!" }),
//         new ChatItem({ name: "John Dow 1", message: "What?" }),
//         new ChatItem({ name: "John Dow 2", message: "What?" }),
//         new ChatItem({ name: "John Dow 3", message: "What?" }),
//         new ChatItem({ name: "John Dow 4", message: "What?" }),
//         new ChatItem({ name: "John Dow 5", message: "What?" }),
//         new ChatItem({ name: "John Dow 6", message: "What?" }),
//         new ChatItem({ name: "John Dow", message: "What?" }),
//         new ChatItem({ name: "John Dow", message: "What?" }),
//         new ChatItem({ name: "John Dow", message: "What?" }),
//         new ChatItem({ name: "John Dow", message: "What?" }),
//       ],
//     });
//   }

//   override render() {
//     return "<div>{{{ lists }}}</div>";
//   }
// }

const user = {
  email: "test@gmail.com",
  login: "login.login",
  firstName: "Ваня",
  secondName: "Иванов",
  displayName: "login.login",
  phone: "89155678990",
};

const pages = {
  // chat: [Pages.chatPage, Mocks.chatMock, Scripts.chatPageFunc],
  login: new LoginPage({ isRegistration: false, onBtnClick: () => console.log("Клик"), buttonText: "Войти", title: "Вход", linkText: "Нет аккаунта?", page: "login-registration", buttonPage: "chat" }),
  "login-registration": new LoginPage({
    isRegistration: true,
    onBtnClick: () => console.log("Регистрация"),
    buttonText: "Зарегистрироваться",
    title: "Регистрация",
    linkText: "Вход",
    page: "login",
    buttonPage: "chat",
  }),
  profile: new ProfilePage({
    user: user,
    isChangePass: false,
    disabled: true,
    buttonArrowPage: "chat",
    buttonSavePage: "login",
    // buttonChangeData: "login",
    // buttonChangePass: "login",
    buttonExit: "login",
  }),

  // "profile-update": [Pages.profilePage, { ...Mocks.profileMock, isChangePass: false, isDisabled: false }, Scripts.profilePageFunc],
  // "profile-change-pass": [Pages.profilePage, { ...Mocks.profileMock, isChangePass: true, isDisabled: false }, Scripts.profilePageFunc],
  // error500: [Pages.errorPage, { text: "Мы уже фиксим", error: 500 }],
  // error404: [Pages.errorPage, { text: "Не туда попали", error: 404 }],
};

type pageType = keyof typeof pages;

function navigate(page: pageType) {
  // const [source, context, func] = pages[page];
  // const handlebarsFunct = Handlebars.compile(source);
  // document.body.innerHTML = handlebarsFunct(context);

  // if (typeof func === "function") {
  //   func();
  // }

  const block = pages[page];
  const container = document.getElementById("app")!;
  if (container) {
    container.innerHTML = ``;
    container.appendChild(block.getContent()!);
  }
}

document.addEventListener("DOMContentLoaded", () => navigate("profile"));

document.addEventListener("click", e => {
  const target = e.target as HTMLElement;
  let page = target.getAttribute("page");
  debugger;
  if (!page && target.parentElement) {
    page = (target.parentElement as HTMLElement).getAttribute("page");
  }
  debugger;
  if (page && page in pages) {
    navigate(page as pageType);
    debugger;
    e.preventDefault();
    e.stopImmediatePropagation();
  }
});

// const block = new LoginPage({ onBtnClick: () => console.log("Клик"), buttonText: "Войти", title: "Вход", linkText: "Нет аккаунта?", page: "login-registration", buttonPage: "chat" });
// // const block = new ProfilePage({ isPage: true, onBtnClick: () => console.log("Клик") });
// const container = document.getElementById("app")!;
// container.append(block.getContent()!);

// button: new Button({ text: props.buttonText, onClick: props.onButtonClick, type: "button", isCircle: true }),
// // inputLogin: new Input({
// //   label: "input",
// // }),
// // inputPassword: new Input({
// //   label: "input",
// // }),
// title: new Title({ title: props.title }),
// link: new Link({ text: props.linkText }),
