import Block from "../../tools/Block";
import { ChatHeader, ChatItem, IChat, MessagesFeed } from "../../components";

interface ChatPageProps {
  chatsList: IChat[];
  currentChat: number;
  chatAvatar: string;
  chatName: string;
  chatDate: string;
  chat: unknown;
}

export class ChatPage extends Block {
  constructor(props: ChatPageProps) {
    super({
      chatHeader: new ChatHeader(),
      lists: props.chatsList.map(chat => new ChatItem({ chat: chat, isCurrent: chat.id === props.currentChat })),
      messagesFeed: new MessagesFeed({ chatAvatar: props.chatAvatar, chatName: props.chatName, chatDate: props.chatDate, chat: props.chat }),
    });
  }

  override render() {
    return `<div class="chat-page">
                <aside class="chat-page__list">
                    {{{chatHeader}}}
                    <ul class="chat-page__list-container">
                      {{{lists}}}
                    </ul>
                </aside>
            <div  class="chat-page__messages">
              {{{messagesFeed}}}
            </div>
        </div>`;
  }
}
