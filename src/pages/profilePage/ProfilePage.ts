//@ts-nocheck
import Block from "../../tools/Block";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { InputField } from "../../components/inputField";
import { InputFile } from "../../components/inputFile";
import { Modal } from "../../components/modal";
import { ProfileItem } from "../../components";
import { default as ProfilePageTemplate } from "./profilePage.hbs?raw";

export class ProfilePage extends Block {
  constructor(props) {
    super({
      ...props,
      isChangePass: props.isChangePass
      // modal: new Modal(),
      // input: new Input(),
      // inputField: new InputField(),
      user: props.user,
      buttonArrow: new Button({ page: props.buttonArrowPage, isCircle: true, text: `<img src='/icons/arrow-left.svg' page="chat" alt="Arrow left icon"><img>` }),
      buttonSave: new Button({ page: props.buttonSavePage, text: "Сохранить"}),
      buttonChangeData: new Button({ page: props.buttonChangeData, text: "Изменить данные", isGhost: true}),
      buttonChangePass: new Button({ page: props.buttonChangePass, text: "Изменить пароль", isGhost: true}),
      buttonExit: new Button({ page: props.buttonExit, text: "Выйти", isGhost: true, isWarning: true, className='profile-page__footer__btn--warning'}),
      // inputFile: new InputFile(),
      // profileItem: new ProfileItem(),
    });
  }


  render() {
    return `<div class="profile-page">
      <aside class="profile-page__sidebar">
        {{{buttonArrow}}}
      </aside>
      <main class="profile-page__main">
        <div class="profile-page__main__container">
          <div class="profile-page__main__avatar">
            <img width="40px" height="40px" alt="User avatar" src='/icons/img.svg'><img>
          </div>
          <div><span class="profile-page__main__name-text">{{ user.name }}</span></div>
          <form>
                <div class="profile-page__main__body">
                    {{#if isChangePass }}
                        {{> ProfileItem name="oldPassword" type="password" label="Старый пароль" }}
                        {{> ProfileItem name="newPassword" type="password" label="Новый пароль" }}
                        {{> ProfileItem name="repeatNewPassword" type="password" label="Повторите новый пароль" }}
                    {{else}}
                        {{> ProfileItem name="email" label="Почта" isDisabled=isDisabled value=email }}
                        {{> ProfileItem name="login" label="Логин" isDisabled=isDisabled value=login }}
                        {{> ProfileItem name="first_name" label="Имя" isDisabled=isDisabled value=first_name }}
                        {{> ProfileItem name="second_name" label="Фамилия" isDisabled=isDisabled value=second_name }}
                        {{> ProfileItem name="display_name" label="Имя в чате" isDisabled=isDisabled value=display_name }}
                        {{> ProfileItem name="phone" label="Телефон" isDisabled=isDisabled value=phone }}
                    {{/if}}
                </div>
                <div class="profile-page__footer">
                    {{#if_not_profile isChangePass isDisabled}}
                        {{{buttonSave}}}
                    {{else}}
                        <div class="profile-page__footer__item">
                          {{{buttonChangeData}}}
                        </div>
                        <div class="profile-page__footer__item">
                          {{{buttonChangePass}}}
                        </div>
                        <div class="profile-page__footer__item">
                          {{{buttonExit}}}
                        </div>
                    {{/if_not_profile}}
                </div>
            </form>
        </div>
      </main>
    </div>`;
  }
}

`<div class="profile-page">
    {{#> Modal id='profileAvatarSettingModal' title="Загрузите файл" btnText='Поменять'}}
        {{> InputFile isMultiple='false' id="avatar" name="avatar" accept="image/png, image/jpeg, image/jpg"}}
    {{/ Modal }}
    <aside class="profile-page__sidebar">
        {{#> Button page="chat" circle=true }}
            <img src='/icons/arrow-left.svg' page="chat" alt="Arrow left icon"><img>
        {{/ Button }}
    </aside>
    <main class="profile-page__main">
        <div class="profile-page__main__container">
            <div class="profile-page__main__avatar">
                <img width="40px" height="40px" alt="User avatar" src={{#if avatar}}{{ avatar }}{{else }}'/icons/img.svg'{{/if}}><img>
            </div>
            <div><span class="profile-page__main__name-text">{{ name }}</span></div>
            <form>
                <div class="profile-page__main__body">
                    {{#if isChangePass }}
                        {{> ProfileItem name="oldPassword" type="password" label="Старый пароль" }}
                        {{> ProfileItem name="newPassword" type="password" label="Новый пароль" }}
                        {{> ProfileItem name="repeatNewPassword" type="password" label="Повторите новый пароль" }}
                    {{else}}
                        {{> ProfileItem name="email" label="Почта" isDisabled=isDisabled value=email }}
                        {{> ProfileItem name="login" label="Логин" isDisabled=isDisabled value=login }}
                        {{> ProfileItem name="first_name" label="Имя" isDisabled=isDisabled value=first_name }}
                        {{> ProfileItem name="second_name" label="Фамилия" isDisabled=isDisabled value=second_name }}
                        {{> ProfileItem name="display_name" label="Имя в чате" isDisabled=isDisabled value=display_name }}
                        {{> ProfileItem name="phone" label="Телефон" isDisabled=isDisabled value=phone }}
                    {{/if}}
                </div>
                <div class="profile-page__footer">
                    {{#if_not_profile isChangePass isDisabled}}
                        {{#> Button  page="profile"}}
                            <span page="profile">Сохранить</span>
                        {{/ Button }}
                    {{else}}
                        <div class="profile-page__footer__item">
                            {{#> Button ghost='true' }}
                                <span page="profile-update">Изменить данные</span>
                            {{/ Button }}
                        </div>
                        <div class="profile-page__footer__item">
                            {{#> Button ghost='true' }}
                                <span page="profile-change-pass">Изменить пароль</span>
                            {{/ Button }}
                        </div>
                        <div class="profile-page__footer__item">
                            {{#> Button ghost='true' warning='true' className='profile-page__footer__btn--warning' }}
                                <span page="chat">Выйти</span>
                            {{/ Button }}
                        </div>
                    {{/if_not_profile}}
                </div>
            </form>
        </div>
    </main>
</div>`;
