import { ChatsController } from "@/controllers/chats";
import { Dropdown, Form, InputField, Modal } from "..";
import Block from "@/core/Block";
import store from "@/core/Store.ts";
import { validateAndCollectFormData } from "@/utils/validateAndCollectFormData";

interface MessagesFeedHeaderProps {
  avatar: string;
  name: string;
}

export class MessagesFeedHeader extends Block {
  constructor(props: MessagesFeedHeaderProps) {
    super({
      avatar: props.avatar,
      name: props.name,
      dropdown: new Dropdown({
        isOpen: false,
        iconSrc: "/icons/vertical-dots.svg",
        options: [
          {
            iconSrc: "/icons/circle-plus.svg",
            text: "Добавить пользователя",
            onClick: () => {
              this.setProps({ isOpenAddUserModal: true });
            },
          },
          {
            iconSrc: "/icons/circle-cross.svg",
            text: "Удалить пользователя",
            onClick: () => {
              this.setProps({ isOpenDeleteUserModal: true });
            },
          },
        ],
      }),
      createModal: new Modal({
        id: "add-user-modal",
        title: "Добавить пользователя",
        btnText: "Добавить",
        isShow: true,
        children: new Form({
          className: "create-chat",
          formTitle: "",
          buttonText: "Добавить",
          isFooter: true,
          onSubmit: (event: Event) => {
            event.preventDefault();
            const target = event.target as HTMLFormElement;
            const { formData } = validateAndCollectFormData(target);
            // const form = e.target as HTMLFormElement;
            // const { formData } = validateAndCollectFormData(form);
            // ChatsController.create(formData.title);
            // this.setProps({ isOpenCreateModal: false });

            if (formData) {
              const userId = formData["user-id"].split(",").map(n => +n);
              const chatId = store?.getState()?.selectedChat.id;
              if (chatId && userId) {
                ChatsController.addUserToChat(chatId, userId);
                target.reset();
                this.setProps({
                  success: true,
                });
                setTimeout(() => {
                  this.setProps({
                    isOpenCreateModal: false,
                  });
                }, 1000);
              }
            }
          },
          children: [
            new InputField({
              title: "ID пользователя (если несколько, укажите через запятую)",
              name: "user-id",
              id: "chat-user-id",
              border: true,
            }),
          ],
        }),
      }),
      // deleteModal: ,
    });
  }

  override render() {
    return `<header class="messages-feed-header">
                <div class="messages-feed-header__user">
                    ${this.props.avatar ? `<div class="messages-feed-header__avatar"><img alt="User avatar" src={{ avatar }}><img></div>` : ' <div class="messages-feed-header__avatar"></div>'}
                    <span class="messages-feed-header__name">{{ name }}</span>
                </div>
                {{{dropdown}}}
                {{#if isOpenCreateModal}}
                  {{{createModal}}}
                {{/if}}
                {{#if isOpenDeleteModal}}
                  {{{deleteModal}}}
                {{/if}}
            </header>`;
  }
}
