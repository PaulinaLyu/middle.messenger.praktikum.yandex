import Block from "../../tools/Block";
import { Link } from "../../components/link";
import { Button } from "../../components/button";
import { Title } from "../../components/title";
import { InputField } from "../../components/inputField";

interface LoginPageProps {
  isRegistration: boolean;
  buttonText: string;
  onBtnClick: () => void;
  buttonPage: string;
  title: string;
  linkText: string;
  linkPage: string;
}

export class LoginPage extends Block {
  constructor(props: LoginPageProps) {
    super({
      ...props,
      isRegistration: props?.isRegistration,
      button: new Button({ text: props.buttonText, onClick: props.onBtnClick, page: props.buttonPage }),
      title: new Title({ title: props.title }),
      link: new Link({
        text: props.linkText,
        page: props.linkPage,
      }),
      inputLogin: new InputField({
        className: "login-form__input",
        title: "Логин",
        name: "login",
        id: "login-login",
        nobg: true,
        border: true,
      }),
      inputPassword: new InputField({
        className: "login-form__input",
        title: "Пароль",
        name: "password",
        id: "login-password",
        type: "password",
        border: true,
        nobg: true,
      }),
      inputEmail: new InputField({
        className: "login-form__input",
        title: "Почта",
        name: "email",
        id: "reg-email",
        border: true,
        nobg: true,
      }),
      inputFirstName: new InputField({
        className: "login-form__input",
        title: "Имя",
        name: "first_name",
        id: "reg-first_name",
        border: true,
        nobg: true,
      }),
      inputSecondName: new InputField({
        className: "login-form__input",
        title: "Фамилия",
        name: "second_name",
        id: "reg-second_name",
        border: true,
        nobg: true,
      }),
      inputPhone: new InputField({
        className: "login-form__input",
        title: "Телефон",
        name: "phone",
        id: "reg-phone",
        border: true,
        nobg: true,
      }),
      inputPasswordRepeat: new InputField({
        className: "login-form__input",
        title: "Пароль (еще раз)",
        name: "password",
        id: "reg-password-repeat",
        type: "password",
        border: true,
        nobg: true,
      }),
    });
  }

  override render() {
    return `<main class="login-page">
        <div class="login-page-card">
          <form class="login-form">
            <div class="login-form__body">
              {{{title}}}
              ${
                this.props.isRegistration
                  ? "{{{inputEmail}}}{{{inputLogin}}}{{{inputFirstName}}}{{{inputSecondName}}}{{{inputPhone}}}{{{inputPassword}}}{{{inputPasswordRepeat}}}"
                  : "{{{inputLogin}}}{{{inputPassword}}}"
              }
            </div>
            <div>
              {{{button}}}
              {{{link}}}
            </div>
          </form>
        </div>
      </main>`;
  }
}
