import Block from "@/core/Block";
import { ChatHeader, ChatItem, MessagesFeed } from "@/components";
import { ChatsController } from "@/controllers/chats";
import { ChatModel } from "@/types/models/Chat";

export const chatsListMockTest = [
  {
    id: 1,
    name: "Андрей",
    message: "Магическая битва топМагическая битва топМагическая битва топМагическая битва топМагическая битва топМагическая битва топ",
    unread: 2,
    date: "10:40",
  },
  { id: 3, name: "Ваня", message: "Го в Японию", unread: 4, date: "12:00" },
];

interface ChatPageProps {
  chatsList: ChatModel[];
  currentChat: number;
  chatAvatar: string;
  chatName: string;
  chatDate: string;
  chat: {
    user_1: { message: string; time: string }[];
    user_2: { message: string; time: string }[];
  };
}

export class ChatPage extends Block {
  constructor(props: ChatPageProps) {
    debugger;
    super({
      chatHeader: new ChatHeader({ isOpenCreateModal: false }),
      lists: chatsListMockTest?.map(chat => new ChatItem({ chat: chat, isCurrent: chat.id === props.currentChat })) || [],
      // lists: [],
      messagesFeed: new MessagesFeed({ chatAvatar: props.chatAvatar, chatName: props.chatName, chatDate: props.chatDate, chat: props.chat }),
    });
    debugger;
  }

  componentDidUpdate() {
    debugger;
    if (this.props.chatsList) {
      const propsChatsList = this.props.chatsList as ChatModel[];
      debugger;
      const test = propsChatsList.map(chat => new ChatItem({ chat: chat, isCurrent: chat.id === this.props.currentChat }));
      debugger;
      this.children.lists = test;
    }
    return true;
  }

  componentDidMount() {
    debugger;
    ChatsController.getChatsList();
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
