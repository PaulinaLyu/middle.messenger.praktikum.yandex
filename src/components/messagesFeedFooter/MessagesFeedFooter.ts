import { Button, Dropdown, Input } from "..";
import Block from "../../tools/Block";

export class MessagesFeedFooter extends Block {
  constructor() {
    super({
      input: new Input({ className: "input__element", isCircle: true, id: "message-input", placeholder: "Сообщение", name: "message" }),
      button: new Button({ isCircle: true, text: '<img src="/icons/arrow-right.svg" alt="Arrow right icon"><img>', onClick: () => console.log("Отправить") }),
      dropdown: new Dropdown({
        isOpen: false,
        iconSrc: "/icons/clip.svg",
        position: "top",
        options: [
          { iconSrc: "/icons/photo.svg", text: "Фото или Видео" },
          { iconSrc: "/icons/file.svg", text: "Файл" },
          { iconSrc: "/icons/location.svg", text: "Локация" },
        ],
      }),
    });
  }

  override render() {
    return `<footer class="messages-feed-footer">
        {{{dropdown}}}
        {{{input}}}
        {{{button}}}
    </footer>`;
  }
}
