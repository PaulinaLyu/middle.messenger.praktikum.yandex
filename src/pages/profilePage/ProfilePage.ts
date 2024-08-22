import Block from "../../tools/Block";
import { IUser } from "../../types";
import { InputFile, Modal, Button, ProfileItem } from "../../components";
import { validation } from "../../utils";

interface ProfilePageProps {
  isChangePass: boolean;
  user: IUser;
  disabled: boolean;
  buttonArrowPage?: string;
  buttonExit?: string;
  isShowModal: boolean;
}

export class ProfilePage extends Block {
  constructor(props: ProfilePageProps) {
    super({
      ...props,
      isChangePass: props.isChangePass,
      isShowModal: props.isShowModal,
      modal: new Modal({
        id: "profileAvatarSettingModal",
        title: "Загрузите файл",
        btnText: "Поменять",
        children: new InputFile({ isMultiple: false, id: "avatar", name: "avatar", accept: "image/png, image/jpeg, image/jpg" }),
        isShow: props.isShowModal,
      }),
      user: props.user,

      buttonAvatar: new Button({
        isGhost: true,
        text: `<div class="profile-page__main__avatar"><img width="40px" height="40px" alt="User avatar" src='/icons/img.svg'><img></div>`,
        onClick: () => {
          this.setProps({ isShowModal: true });
        },
      }),

      buttonArrow: new Button({
        page: props.buttonArrowPage,
        isCircle: true,
        text: `<img src='/icons/arrow-left.svg' page="chat" alt="Arrow left icon"><img>`,
        onClick: () => console.log("Клик стрелка"),
      }),
      buttonSave: new Button({
        text: "Сохранить",
        onClick: () => {
          this.setProps({ disabled: true, isChangePass: false });
        },
      }),
      buttonChangeData: new Button({
        text: "Изменить данные",
        isGhost: true,
        onClick: () => {
          this.setProps({ disabled: false });
        },
      }),
      buttonChangePass: new Button({
        text: "Изменить пароль",
        isGhost: true,
        onClick: () => {
          this.setProps({ isChangePass: true });
        },
      }),
      buttonExit: new Button({ page: props.buttonExit, text: "Выйти", isGhost: true, isWarning: true, className: "profile-page__footer__btn--warning", onClick: () => console.log("Выход") }),
      profileItemEmail: new ProfileItem<string>({ name: "email", label: "Почта", disabled: props.disabled, value: props.user.email, validate: validation, validationName: "email" }),
      profileItemLogin: new ProfileItem<string>({ name: "login", label: "Логин", disabled: props.disabled, value: props.user.login, validate: validation, validationName: "login" }),
      profileItemFirstName: new ProfileItem<string>({ name: "first_name", label: "Имя", disabled: props.disabled, value: props.user.firstName, validate: validation, validationName: "name" }),
      profileItemSecondName: new ProfileItem<string>({ name: "second_name", label: "Фамилия", disabled: props.disabled, value: props.user.secondName, validate: validation, validationName: "name" }),
      profileItemDisplayName: new ProfileItem<string>({ name: "display_name", label: "Имя в чате", disabled: props.disabled, value: props.user.displayName }),
      profileItemPhone: new ProfileItem<string>({ name: "phone", label: "Телефон", disabled: props.disabled, value: props.user.phone, validate: validation, validationName: "phone" }),
      profileOldPassword: new ProfileItem<string>({ name: "oldPassword", label: "Старый пароль", type: "password", disabled: false, validate: validation, validationName: "password" }),
      profileNewPassword: new ProfileItem<string>({ name: "newPassword", label: "Новый пароль", type: "password", disabled: false, validate: validation, validationName: "password" }),
      profileRepeatNewPassword: new ProfileItem<string>({
        name: "repeatNewPassword",
        label: "Повторите новый пароль",
        type: "password",
        disabled: false,
        validate: validation,
        validationName: "password",
      }),
    });
  }

  override render() {
    return `<div class="profile-page">
      {{{modal}}}
      <aside class="profile-page__sidebar">
        {{{buttonArrow}}}
      </aside>
      <main class="profile-page__main">
        <div class="profile-page__main__container">
          <div><span class="profile-page__main__name-text">{{ user.name }}</span></div>
          {{{buttonAvatar}}}
          <form>
                <div class="profile-page__main__body">
                    ${
                      this.props.isChangePass
                        ? `{{{profileOldPassword}}}
                            {{{profileNewPassword}}}
                            {{{profileRepeatNewPassword}}}`
                        : `{{{profileItemEmail}}}
                            {{{profileItemLogin}}}
                            {{{profileItemFirstName}}}
                            {{{profileItemSecondName}}}
                            {{{profileItemDisplayName}}}
                            {{{profileItemPhone}}}`
                    }
                </div>
                <div class="profile-page__footer">
                ${
                  this.props.isChangePass || !this.props.disabled
                    ? "{{{buttonSave}}}"
                    : `<div class="profile-page__footer__item">
                        {{{buttonChangeData}}}
                      </div>
                      <div class="profile-page__footer__item">
                        {{{buttonChangePass}}}
                      </div>
                      <div class="profile-page__footer__item">
                        {{{buttonExit}}}
                      </div>`
                }
                </div>
            </form>
        </div>
      </main>
    </div>`;
  }
}
// <div class="profile-page__main__avatar">
//   <img width="40px" height="40px" alt="User avatar" src='/icons/img.svg'><img>
// </div>
// <div><span class="profile-page__main__name-text">{{ user.name }}</span></div>
