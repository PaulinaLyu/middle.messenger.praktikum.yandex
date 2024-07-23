import { Input, Link } from "..";
import Block from "../../tools/Block";

export class ChatHeader extends Block {
  constructor() {
    super({
      linkProfile: new Link({
        text: "Профиль",
        page: "profile",
        secondary: "secondary",
      }),
      linkLogin: new Link({
        text: "Логин",
        page: "login",
        secondary: "secondary",
      }),
      linkError500: new Link({
        text: "500 ошибка",
        page: "error500",
        secondary: "secondary",
      }),
      linkError404: new Link({
        text: "404 ошибка",
        page: "error404",
        secondary: "secondary",
      }),
      input: new Input({
        className: "input__element",
        type: "search",
        id: "chat-search",
        placeholder: "Поиск",
        name: "chat-search",
        nobg: false,
        isSearch: true,
      }),
    });
  }

  render() {
    return `<div class="chat-header">
            <nav class="chat-header__nav">
                {{{linkProfile}}}
                {{{linkLogin}}}
                {{{linkError500}}}
                {{{linkError404}}}
            </nav>
            {{{input}}}
        </div>`;
  }
}
