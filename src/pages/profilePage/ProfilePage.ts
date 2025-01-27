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
        isCircle: true,
        text: `<img src='/icons/arrow-left.svg' alt="Arrow left icon"><img>`,
        onClick: () => Router.getInstance().back(),
      }),

      // buttonSave: new Button({
      //   text: "Сохранить",
      //   type: "submit",
      //   onClick: () => {
      //     this.setProps({ disabled: true, isChangePass: false });

      //   },
      // }),

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
          if (formData && props.disabled) {
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
    debugger;
    if (oldProps.isShowModal !== newProps.isShowModal) {
      debugger;
      this.setProps({ isShowModal: newProps.isShowModal });
    }

    // if (oldProps.disabled !== newProps.disabled) {
    //   const lists = this.children.form.lists.children;
    //   lists.forEach(element => element.setProps({ disabled: newProps.disabled }));
    //   this.setProps({ disabled: newProps.disabled });
    // }
    // if (oldProps.isChangePass !== newProps.isChangePass) {
    //   if (newProps.isChangePass) {
    //     console.log(this);
    //     this.children.form.lists.children = [
    //       new ProfileItem<string>({ name: "oldPassword", label: "Старый пароль", type: "password", disabled: false, validate: validation, validationName: "password" }),
    //       new ProfileItem<string>({ name: "newPassword", label: "Новый пароль", type: "password", disabled: false, validate: validation, validationName: "password" }),
    //       new ProfileItem<string>({
    //         name: "repeatNewPassword",
    //         label: "Повторите новый пароль",
    //         type: "password",
    //         disabled: false,
    //         validate: validation,
    //         validationName: "password",
    //       }),
    //     ];
    //     // debugger;
    //     // this.children.form.setProps({
    //     //   children: [
    //     //     new ProfileItem<string>({ name: "oldPassword", label: "Старый пароль", type: "password", disabled: false, validate: validation, validationName: "password" }),
    //     //     new ProfileItem<string>({ name: "newPassword", label: "Новый пароль", type: "password", disabled: false, validate: validation, validationName: "password" }),
    //     //     new ProfileItem<string>({
    //     //       name: "repeatNewPassword",
    //     //       label: "Повторите новый пароль",
    //     //       type: "password",
    //     //       disabled: false,
    //     //       validate: validation,
    //     //       validationName: "password",
    //     //     }),
    //     //   ],
    //     // });
    //   } else {
    //     this.children.form.lists.children = [
    //       new ProfileItem<string>({ name: "email", label: "Почта", disabled: Boolean(this.props.disabled), value: this.props?.user?.email || "", validate: validation, validationName: "email" }),
    //       new ProfileItem<string>({ name: "login", label: "Логин", disabled: Boolean(this.props.disabled), value: this.props?.user?.login || "", validate: validation, validationName: "login" }),
    //       new ProfileItem<string>({ name: "first_name", label: "Имя", disabled: Boolean(this.props.disabled), value: this.props?.user?.firstName, validate: validation, validationName: "name" }),
    //       new ProfileItem<string>({ name: "second_name", label: "Фамилия", disabled: Boolean(this.props.disabled), value: this.props?.user?.secondName, validate: validation, validationName: "name" }),
    //       new ProfileItem<string>({ name: "display_name", label: "Имя в чате", disabled: Boolean(this.props.disabled), value: this.props.user?.displayName }),
    //       new ProfileItem<string>({ name: "phone", label: "Телефон", disabled: Boolean(this.props.disabled), value: this.props.user?.phone, validate: validation, validationName: "phone" }),
    //     ];
    //     // this.children.form.setProps({
    //     //   children: [
    //     //     new ProfileItem<string>({ name: "email", label: "Почта", disabled: this.props.disabled, value: this.props.user.email, validate: validation, validationName: "email" }),
    //     //     new ProfileItem<string>({ name: "login", label: "Логин", disabled: this.props.disabled, value: this.props.user.login, validate: validation, validationName: "login" }),
    //     //     new ProfileItem<string>({ name: "first_name", label: "Имя", disabled: this.props.disabled, value: this.props.user.firstName, validate: validation, validationName: "name" }),
    //     //     new ProfileItem<string>({ name: "second_name", label: "Фамилия", disabled: this.props.disabled, value: this.props.user.secondName, validate: validation, validationName: "name" }),
    //     //     new ProfileItem<string>({ name: "display_name", label: "Имя в чате", disabled: this.props.disabled, value: this.props.user.displayName }),
    //     //     new ProfileItem<string>({ name: "phone", label: "Телефон", disabled: this.props.disabled, value: this.props.user.phone, validate: validation, validationName: "phone" }),
    //     //   ],
    //     // });
    //   }
    //   this.setProps({ isChangePass: newProps.isChangePass });
    // }

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
            !this.props.isChangePass || this.props.disabled
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
