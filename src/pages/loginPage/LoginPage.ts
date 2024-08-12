import Block from "../../tools/Block";
import { Form, InputField } from "../../components";
import { getFormFieldValue } from "../../utils";

interface LoginPageProps {
  isRegistration: boolean;
  buttonText: string;
  onBtnClick?: () => void;
  buttonPage: string;
  title: string;
  linkText: string;
  linkPage: string;
}

function validateLogin(login: string) {
  const loginRegex = /^(?=.*[a-zA-Z])([a-zA-Z0-9_-]{3,20})$/;

  if (loginRegex.test(login)) {
    return true;
  } else {
    return false;
  }
}

function validatePassword(password: string) {
  const minLength = 8;
  const maxLength = 40;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasDigit = /\d/.test(password);

  if (password.length < minLength || password.length > maxLength) {
    return false;
  }

  if (!hasUpperCase) {
    return false;
  }

  if (!hasDigit) {
    return false;
  }

  return true;
}

export class LoginPage extends Block {
  constructor(props: LoginPageProps) {
    super({
      ...props,
      isRegistration: props?.isRegistration,
      form: new Form({
        className: "login-form",
        formTitle: props.title,
        buttonText: props.buttonText,
        buttonPage: props.buttonPage,
        linkText: props.linkText,
        linkPage: props.linkPage,
        onSubmit: (e: Event) => {
          e.preventDefault();

          const form = e.target as HTMLFormElement;
          const login = getFormFieldValue(form, "login");
          const password = getFormFieldValue(form, "password");

          console.log("Логин: ", login);
          console.log("Пароль: ", password);

          if (props?.isRegistration) {
            const email = getFormFieldValue(form, "email");
            const first_name = getFormFieldValue(form, "first_name");
            const second_name = getFormFieldValue(form, "second_name");
            const phone = getFormFieldValue(form, "phone");
            const password_repeat = getFormFieldValue(form, "password_repeat");

            console.log("Пароль(повтор): ", password_repeat);
            console.log("Почта: ", email);
            console.log("Имя: ", first_name);
            console.log("Фамилия: ", second_name);
            console.log("Телефон: ", phone);
          }
        },
        children: props.isRegistration
          ? [
              new InputField<string>({
                className: "login-form__input",
                title: "Логин",
                name: "login",
                id: "login-login",
                nobg: true,
                border: true,
                isValid: true,
                validate: validateLogin,
              }),
              new InputField({
                className: "login-form__input",
                title: "Почта",
                name: "email",
                id: "reg-email",
                border: true,
                nobg: true,
              }),
              new InputField({
                className: "login-form__input",
                title: "Имя",
                name: "first_name",
                id: "reg-first_name",
                border: true,
                nobg: true,
              }),
              new InputField({
                className: "login-form__input",
                title: "Фамилия",
                name: "second_name",
                id: "reg-second_name",
                border: true,
                nobg: true,
              }),
              new InputField({
                className: "login-form__input",
                title: "Телефон",
                name: "phone",
                id: "reg-phone",
                border: true,
                nobg: true,
              }),
              new InputField({
                className: "login-form__input",
                title: "Пароль",
                name: "password",
                id: "reg-password",
                type: "password",
                border: true,
                nobg: true,
              }),
              new InputField({
                className: "login-form__input",
                title: "Пароль (еще раз)",
                name: "password_repeat",
                id: "reg-password-repeat",
                type: "password",
                border: true,
                nobg: true,
              }),
            ]
          : [
              new InputField({
                className: "login-form__input",
                title: "Логин",
                name: "login",
                id: "login-login",
                nobg: true,
                border: true,
                isValid: true,
                validate: validateLogin,
              }),
              new InputField({
                className: "login-form__input",
                title: "Пароль",
                name: "password",
                id: "login-password",
                type: "password",
                border: true,
                nobg: true,
                isValid: true,
                validate: validatePassword,
              }),
            ],
      }),
    });
  }

  override render() {
    return `<main class="login-page">
        <div class="login-page-card">
          {{{form}}}
        </div>
      </main>`;
  }
}
