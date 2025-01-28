import { Routes } from "@/types";
import { Input, Link, Button, InputField, Modal, Form } from "..";
import Block, { BlockProps } from "@/core/Block";
import { validateAndCollectFormData } from "@/utils/validateAndCollectFormData";
import { ChatsController } from "@/controllers/chats";

interface ChatHeaderProps {
  isOpenCreateModal: boolean
}

export class ChatHeader extends Block {

  constructor(props: ChatHeaderProps) {

    super({
      linkProfile: new Link({
        text: "Профиль ",
        url: Routes.Profile,
        secondary: "secondary",
      }),
      input: new Input({
        className: "input__element",
        type: "search",
        id: "chat-search",
        placeholder: "Поиск",
        name: "chat-search",
        nobg: false,
        isSearch: true,
      }),
      createBtn: new Button({
        className: 'chat-header__create-btn',
        isCircle: true,
        isGhost: true,
        text: `<img alt="Create chat button" src='/icons/circle-plus.svg' />`,
        onClick: () => {
          this.setProps({ isOpenCreateModal: !props.isOpenCreateModal });
        },
      }),
      modal: new Modal({
        id: 'create-chat-modal',
        title: "Создать чат",
        btnText: "Создать",
        isShow: props.isOpenCreateModal,
        children: new Form({
                className: "create-chat",
                formTitle: "",
                buttonText: "Создать",
                isFooter: true,
                onSubmit: (e: Event) => {
                  const form = e.target as HTMLFormElement;
                  const { formData } = validateAndCollectFormData(form);
                  ChatsController.create(formData.title);
                  this.setProps({isOpenCreateModal: false})
                },
                children:[
                  new InputField({
                    title: "Имя чата",
                    name: "title",
                    id: "create-chat-form-title",
                    border: true,
                  }),
                ]
              })
      })
    })}
  componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
      if (oldProps === newProps) {
        return false;
      }
      debugger;
      if (oldProps.isOpenCreateModal !== newProps.isOpenCreateModal) {
          this.children.modal = new Modal({
            id: 'create-chat-modal',
            title: "Создать чат",
            btnText: "Создать",
            isShow: newProps.isOpenCreateModal as boolean,
            children: new Form({
                    className: "create-chat",
                    formTitle: "",
                    buttonText: "Создать",
                    isFooter: true,
                    onSubmit: (e: Event) => {
                      const form = e.target as HTMLFormElement;
                      const { formData } = validateAndCollectFormData(form);
                      ChatsController.create(formData.title);
                      this.setProps({isOpenCreateModal: false})
                    },
                    children:[
                      new InputField({
                        title: "Имя чата",
                        name: "title",
                        id: "create-chat-form-title",
                        border: true,
                      }),
                    ]
                  })
          })
        this.setProps({ isOpenCreateModal: newProps.isOpenCreateModal });
      }

      return true;
    }

  render() {
    return `<div class="chat-header">
            <nav class="chat-header__nav">
                {{{linkProfile}}}
            </nav>
            <div class="chat-header__search">
              {{{input}}}
              {{{createBtn}}}
            </div>
              {{{modal}}}
        </div>`;
  }
}
