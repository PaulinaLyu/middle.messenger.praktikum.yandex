import Block from "@/core/Block";
import { ChatHeader, ChatItem, MessagesFeed } from "@/components";
import { ChatsController } from "@/controllers/chats";
import { ChatModel } from "@/types/models/Chat";
import { MessagesController } from "@/controllers/messages";
import store from "@/core/Store.ts";

export class ChatPage extends Block {
  constructor() {
    super();
  }

  init() {
    this.children.messagesFeed = new MessagesFeed();
    this.children.chatHeader = new ChatHeader();
  }
  componentDidUpdate() {
    if (this.props.chatsList) {
      debugger;
      const propsChatsList = this.props.chatsList as ChatModel[];
      const chatItem = propsChatsList.map(
        chat =>
          new ChatItem({
            chat: chat,
            isCurrent: chat.id === this.props.currentChat,
            onClick: (chatId: number) => {
              const chats = store.getState().chats;
              debugger;
              debugger;
              ChatsController.selectChat(chatId);
              MessagesController.findMessages(chatId);
            },
          }),
      );
      this.children.lists = chatItem;
      // this.children.inputs = this.props.children as Block;
    }
    return true;
  }

  componentDidMount() {
    ChatsController.getChatsList();
  }

  override render() {
    return `<div class="chat-page">
                <aside class="chat-page__list">
                    {{{chatHeader}}}
                    <ul class="chat-page__list-container">
                      {{#each lists}}
                        {{{this}}}
                      {{/each}}
                    </ul>
                </aside>
            <div  class="chat-page__messages">
              {{{messagesFeed}}}
            </div>
        </div>`;
  }
}
