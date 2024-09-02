import { Button, Dropdown, Form, InputElement } from "..";
import Block from "../../tools/Block";
import { validation } from "../../utils";
import { validateAndCollectFormData } from "../../utils/validateAndCollectFormData";

export class MessagesFeedFooter extends Block {
  constructor() {
    super({
      form: new Form({
        isFooter: false,
        className: "messages-feed-footer__form",
        onSubmit: (e: Event) => {
          e.preventDefault();

          const form = e.target as HTMLFormElement;

          const { isValid, formData } = validateAndCollectFormData(form);

          if (!isValid) {
            console.log("Форма содержит ошибки валидации");
            return;
          }

          console.log(`Данные формы отправки сообщения: `, formData);
        },
        children: [
          new InputElement({
            className: "input__element",
            isCircle: true,
            id: "message-input",
            placeholder: "Сообщение",
            name: "message",
            validate: validation,
            validationName: "not_empty",
          }),
          new Button({
            className: "messages-feed-footer__btn",
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
