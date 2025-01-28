import Block from "@/core/Block";
import { ChatHeader, ChatItem, IChat, MessagesFeed } from "@/components";
import { ChatsController } from "@/controllers/chats";
import { ChatModel } from "@/types/models/Chat";

interface ChatPageProps {
  chatsList: IChat[];
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
      chatHeader: new ChatHeader({isOpenCreateModal: false}),
      lists: props?.chatsList?.map(chat => new ChatItem({ chat: chat, isCurrent: chat.id === props.currentChat })) || [],
      messagesFeed: new MessagesFeed({ chatAvatar: props.chatAvatar, chatName: props.chatName, chatDate: props.chatDate, chat: props.chat }),
    });
    debugger;
  }

  componentDidUpdate() {
    if (this.props.chatsList) {
      const propsChatsList = this.props.chatsList as ChatModel[];
      debugger;
      const test = propsChatsList.map(chat => new ChatItem({ chat: chat, isCurrent: chat.id === this.props.currentChat }))
      debugger;
      this.children.lists = test
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
