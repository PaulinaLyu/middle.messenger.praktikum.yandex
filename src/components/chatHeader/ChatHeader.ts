import { Input, Link } from "..";
import Block from "../../core/Block";

export class ChatHeader extends Block {
  constructor() {
    super({
      linkProfile: new Link({
        text: "Профиль ",
        url: "/profile",
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
            </nav>
            {{{input}}}
        </div>`;
  }
}
