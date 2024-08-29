import { Button, Dropdown, Form, Input } from "..";
import Block from "../../tools/Block";
import { getFormFieldValue, validation } from "../../utils";

export class MessagesFeedFooter extends Block {
  constructor() {
    super({
      form: new Form({
        isFooter: false,
        className: "messages-feed-footer__form",
        onSubmit: (e: Event) => {
          e.preventDefault();

          const form = e.target as HTMLFormElement;
          const message = getFormFieldValue(form, "message");

          console.log("Сообщение: ", message);
        },
        children: [
          new Input({
            className: "input__element messages-feed-footer__input",
            isCircle: true,
            id: "message-input",
            placeholder: "Сообщение",
            name: "message",
            validate: validation,
            validationName: "not_empty",
          }),
          new Button({
            isCircle: true,
            type: "submit",
            text: '<img src="/icons/arrow-right.svg" alt="Arrow right icon"><img>',
          }),
        ],
      }),
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
        {{{form}}}
    </footer>`;
  }
}
