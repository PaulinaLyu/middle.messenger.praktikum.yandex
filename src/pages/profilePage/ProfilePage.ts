import Block, { BlockProps } from "@/core/Block";
import { InputFile, Modal, Button, ProfileItem, Form } from "@/components";
import { validation } from "@/utils";
import { validateAndCollectFormData } from "@/utils/validateAndCollectFormData";
import { Router } from "@/core/Router";
import { UserModel } from "@/types/models/User";
import { AuthController } from "@/controllers/auth";
import { ProfileController } from "@/controllers/profile";
import { ChangePasswordRequest, profileRequest } from "@/types/Profile/Profile.dto";

export interface ProfilePageProps {
  isChangePass: boolean;
  user: UserModel;
  disabled: boolean;
  isShowModal: boolean;
  router?: Router;
}

export class ProfilePage extends Block {
  constructor(props: ProfilePageProps) {
    super({
      ...props,
      isChangePass: props.isChangePass,
      disabled: props.disabled,
      isShowModal: props.isShowModal,
      modal: new Modal({
        id: "profileAvatarSettingModal",
        title: "Загрузите файл",
        btnText: "Поменять",
        isShow: props.isShowModal,
        children: new Form({
          className: "change-avatar",
          formTitle: "",
          buttonText: "Изменить аватар",
          isFooter: true,
          onSubmit: (e: Event) => {
            e.preventDefault();
            const formData = new FormData();
            const target = e.target as HTMLInputElement;
            if (target.files && target.files.length !== 0) {
              const file = target.files[0];
              formData.append("avatar", file);
              ProfileController.changeAvatar(formData);
            }
          },
          children: [new InputFile({ isMultiple: false, id: "avatar", name: "avatar", accept: "image/png, image/jpeg, image/jpg" })],
        }),
      }),
      user: props.user,

      buttonAvatar: new Button({
        isGhost: true,
        text: `<div class="profile-page__main__avatar"><img width="100%" height="100%" alt="User avatar" src="${props?.user?.avatar ? `https://ya-praktikum.tech/api/v2/resources${props?.user?.avatar}` : "/icons/img.svg"}"><img></div>`,
        onClick: () => {
          this.setProps({ isShowModal: true });
        },
      }),

      buttonArrow: new Button({
        isCircle: true,
        text: `<img src='/icons/arrow-left.svg' alt="Arrow left icon"><img>`,
        onClick: () => Router.getInstance().back(),
      }),

      buttonExit: new Button({ text: "Выйти", isGhost: true, isWarning: true, className: "profile-page__footer__btn--warning", onClick: () => AuthController.logout() }),

      buttonChangeData: new Button({
        text: "Изменить данные",
        isGhost: true,
        onClick: () => {
          Router.getInstance().go("/edit-profile");
        },
      }),

      buttonChangePass: new Button({
        text: "Изменить пароль",
        isGhost: true,
        onClick: () => {
          Router.getInstance().go("/edit-password");
        },
      }),
      form: new Form({
        className: "profile-page__main__body",
        isFooter: props.isChangePass || !props.disabled,
        buttonText: "Сохранить",
        onSubmit: (e: Event) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const { isValid, formData } = validateAndCollectFormData(form);
          if (!isValid) {
            console.log("Форма содержит ошибки валидации");
            return;
          }
          if (formData && props.isChangePass) {
            ProfileController.changePassword(formData as unknown as ChangePasswordRequest);
          }
          if (formData && !props.disabled) {
            ProfileController.changeProfile(formData as unknown as profileRequest);
          }
        },
        children: props.isChangePass
          ? [
              new ProfileItem<string>({ name: "oldPassword", label: "Старый пароль", type: "password", disabled: false, validate: validation, validationName: "password" }),
              new ProfileItem<string>({ name: "newPassword", label: "Новый пароль", type: "password", disabled: false, validate: validation, validationName: "password" }),
              new ProfileItem<string>({
                name: "repeatNewPassword",
                label: "Повторите новый пароль",
                type: "password",
                disabled: false,
                validate: validation,
                validationName: "password",
              }),
            ]
          : [
              new ProfileItem<string>({ name: "email", label: "Почта", disabled: props.disabled, value: props.user?.email, validate: validation, validationName: "email" }),
              new ProfileItem<string>({ name: "login", label: "Логин", disabled: props.disabled, value: props.user?.login, validate: validation, validationName: "login" }),
              new ProfileItem<string>({ name: "first_name", label: "Имя", disabled: props.disabled, value: props.user?.first_name, validate: validation, validationName: "name" }),
              new ProfileItem<string>({ name: "second_name", label: "Фамилия", disabled: props.disabled, value: props.user?.second_name, validate: validation, validationName: "name" }),
              new ProfileItem<string>({ name: "display_name", label: "Имя в чате", disabled: props.disabled, value: props.user?.display_name }),
              new ProfileItem<string>({ name: "phone", label: "Телефон", disabled: props.disabled, value: props.user?.phone, validate: validation, validationName: "phone" }),
            ],
      }),
    });
    debugger;
  }

  componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
    if (oldProps === newProps) {
      return false;
    }
    if (oldProps.isShowModal !== newProps.isShowModal) {
      this.children.modal = new Modal({
        id: "profileAvatarSettingModal",
        title: "Загрузите файл",
        btnText: "Поменять",
        isShow: newProps.isShowModal as boolean,
        children: new Form({
          className: "change-avatar",
          formTitle: "",
          buttonText: "Изменить аватар",
          isFooter: true,
          onSubmit: (e: Event) => {
            const formData = new FormData();
            e.preventDefault();
            const target = e.target?.[0];
            if (target.files && target.files.length !== 0) {
              const file = target.files[0];
              formData.append("avatar", file);
              ProfileController.changeAvatar(formData);
            }
            this.setProps({ isOpenCreateModal: false });
          },
          children: [new InputFile({ isMultiple: false, id: "avatar", name: "avatar", accept: "image/png, image/jpeg, image/jpg" })],
        }),
      });
      this.setProps({ isShowModal: newProps.isShowModal });
    }
    return true;
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
          {{{form}}}
          <div class="profile-page__footer">
          ${
            this.props.disabled
              ? `
                <div class="profile-page__footer__item">
                  {{{buttonChangeData}}}
                </div>
                <div class="profile-page__footer__item">
                  {{{buttonChangePass}}}
                </div>
                <div class="profile-page__footer__item">
                  {{{buttonExit}}}
                </div>`
              : ""
          }
          </div>
        </div>
      </main>
    </div>`;
  }
}
