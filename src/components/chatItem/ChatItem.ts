import Block from "../../tools/Block";

export interface IChat {
  id: number;
  avatar?: string;
  name: string;
  message: string;
  date: string;
  unread?: number;
}

interface ChatItemProps {
  isCurrent?: boolean;
  chat: IChat;
}

export class ChatItem extends Block {
  constructor(props: ChatItemProps) {
    super({
      isCurrent: props?.isCurrent || false,
      chat: props.chat,
    });
    debugger;
  }

  render() {
    console.log(this?.props);
    debugger;
    return `<li class="chat-item">
    <div class='chat-item__container${this.props.isCurrent ? ` chat-item__container--current` : ""}'>
        <div class="chat-item__main">
        ${
          this?.props?.chat?.avatar
            ? `<div class="chat-item__avatar">
                    <img class="chat-item__avatar" alt="avatar" src={{ avatar }}><img>
                </div>`
            : '<div class="chat-item__avatar"></div>'
        }
            <div>
                <div class="chat-item__name"><span class="chat-item__name-text">{{ chat.name }}</span></div>
                <div class="chat-item__message"><span class="chat-item__message-text">{{ chat.message }}</span></div>
            </div>
        </div>
    
        <div class="chat-item__info">
            <div class="chat-item__date">{{ chat.date }}</div>
            ${this.props.chat.unread ? `<div class="chat-item__unread">{{ chat.unread }}</div>` : ""}
        </div>
  </div>
</li>`;
  }
}
