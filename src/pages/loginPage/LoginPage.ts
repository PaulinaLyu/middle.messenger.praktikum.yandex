//@ts-nocheck
import Block from "../../tools/Block";
import { Link } from "../../components/link";
import { Button } from "../../components/button";
import { Title } from "../../components/title";
import { InputField } from "../../components/inputField";
import { default as LoginPageTemplate } from "./loginPage.hbs?raw";

export class LoginPage extends Block {
  constructor(props) {
    debugger;
    super({
      ...props,
      isRegistration: props?.isRegistration,
      button: new Button({ text: props.buttonText, onClick: props.onBtnClick, type: "button", page: props.buttonPage }),
      title: new Title({ title: props.title }),
      link: new Link({ text: props.linkText, page: props.page }),
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

  render() {
    return `<main class="login-page">
        <div class="login-page-card">
          <form class="login-form">
            <div class="login-form__body">
              {{{title}}}
              ${this.isRegistration ? "{{{inputEmail}}}{{{inputLogin}}}{{{inputFirstName}}}{{{inputSecondName}}}{{{inputPhone}}}{{{inputPassword}}}{{{inputPasswordRepeat}}} " : "<div>123</div>"}
            </div>
            <div>
              {{{button}}}
              {{{link}}}
            </div>
          </form>
        </div>
      </main>`;

    //    : `<main class="login-page">
    //    <div class="login-page-card">
    //      <form class="login-form">
    //        <div class="login-form__body">
    //          {{{title}}}
    //          {{{inputLogin}}}
    //          {{{inputPassword}}}
    //        </div>
    //        <div>
    //          {{{button}}}
    //          {{{link}}}
    //        </div>
    //      </form>
    //    </div>
    //  </main>`
    // {{{inputLogin}}}
    // {{{inputPassword}}}
    //     `<main class="login-page">
    //       {{#> Card }}
    //         <form class="login-form">
    //     <div class="login-form__body">
    //       {{#if isRegistration}}
    //         {{> Title title="Регистрация" }}
    //         {{> InputField className="login-form__input" title="Почта" name="email" inputId="reg-email" border=true no-bg=true }}
    //         {{> InputField className="login-form__input" title="Логин" name="login" inputId="reg-login" border=true no-bg=true }}
    //         {{> InputField className="login-form__input" title="Имя" name="first_name" inputId="reg-first_name" border=true no-bg=true }}
    //         {{> InputField className="login-form__input" title="Фамилия" name="second_name" inputId="reg-second_name" border=true no-bg=true }}
    //         {{> InputField className="login-form__input" title="Телефон" name="phone" inputId="reg-phone" border=true no-bg=true }}
    //         {{> InputField className="login-form__input" title="Пароль" name="password" type="password" inputId="reg-password" border=true no-bg=true }}
    //         {{> InputField className="login-form__input" title="Пароль (еще раз)" name="password" type="password" inputId="reg-password-repeat" border=true no-bg=true }}
    //       {{else}}
    //         {{> Title  title="Вход" }}
    //         {{> InputField className="login-form__input" title="Логин" name="login" inputId="login-login" border=true no-bg=true }}
    //         {{> InputField className="login-form__input" title="Пароль" name="password" inputId="login-password" type="password" border=true no-bg=true }}
    //       {{/if}}
    //     </div>
    //     <div>
    //       {{#> Button page="chat" type="button" }}
    //           <span>{{#if isRegistration}}Зарегистрироваться{{else}}Войти{{/if}}</span>
    //       {{/ Button }}

    //       {{#if isRegistration}}
    //           {{> Link page="login" text='Войти' }}
    //       {{else}}
    //           {{> Link page="login-registration" text='Нет аккаунта?' }}
    //       {{/if}}

    //     </div>
    //   </form>

    // {{/ Card }}
    // </main>`;
  }
}
