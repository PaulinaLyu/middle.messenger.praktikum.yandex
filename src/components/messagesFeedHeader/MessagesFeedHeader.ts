import { Dropdown } from "..";
import Block from "../../core/Block";

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
          { iconSrc: "/icons/circle-plus.svg", text: "Добавить пользователя" },
          { iconSrc: "/icons/circle-cross.svg", text: "Удалить пользователя" },
        ],
      }),
    });
  }

  override render() {
    return `<header class="messages-feed-header">
                <div class="messages-feed-header__user">
                    ${this.props.avatar ? `<div class="messages-feed-header__avatar"><img alt="User avatar" src={{ avatar }}><img></div>` : ' <div class="messages-feed-header__avatar"></div>'}
                    <span class="messages-feed-header__name">{{ name }}</span>
                </div>
                {{{dropdown}}}
            </header>`;
  }
}
