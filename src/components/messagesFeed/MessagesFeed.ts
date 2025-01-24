import Block from "../../core/Block";
import { MessagesFeedFooter, MessagesFeedHeader } from "..";

interface MessagesFeedProps {
  chatAvatar: string;
  chatName: string;
  chatDate: string;
  chat: {
    user_1: { message: string; time: string }[];
    user_2: { message: string; time: string }[];
  };
}

export class MessagesFeed extends Block {
  constructor(props: MessagesFeedProps) {
    super({
      messagesFeedHeader: new MessagesFeedHeader({ avatar: props.chatAvatar, name: props.chatName }),
      messagesFeedFooter: new MessagesFeedFooter(),
      chatDate: props.chatDate,
      chatAvatar: props.chatAvatar,
      chatName: props.chatName,
      chat: props.chat,
      user1: props.chat.user_1[0],
      user2: props.chat.user_2[0],
    });
  }

  render() {
    return `<div class="messages-feed">
                {{!-- <span class="messages-feed__no-data">Выберите чат чтобы отправить сообщение</span> --}}
                {{{messagesFeedHeader}}}
                <main class="messages-feed__main">
                    <div class="messages-feed__main__date"><span>{{chatDate}}</span></div>
                    <div class="messages-feed__main__user-message">
                      <p class="messages-feed__main__user-text">{{user1.message}}</p>
                      <div class="messages-feed__main__user-time">{{user1.time}}</div>
                    </div>
                    <img class="messages-feed__main__user-message" alt="Image icon" src="/img.png" />
                    <div class="messages-feed__main__owner-message">
                      <p class="messages-feed__main__owner-text">{{user2.message}}</p>
                      <div class="messages-feed__main__owner-time">{{user2.time}}</div>
                    </div>
                </main>
                {{{messagesFeedFooter}}}
        </div>`;
  }
}
