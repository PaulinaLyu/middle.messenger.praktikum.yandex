import Block, { BlockProps } from "@/core/Block";
import { Message, MessagesFeedFooter, MessagesFeedHeader } from "..";
import { formatDate } from "@/utils/formatDate";
import { MessageModel } from "@/types/models/Message";

interface MessagesFeedProps extends BlockProps {
  messages: MessageModel[];
  userId: number;
  selectedChatTitle: string;
  selectedChatAvatar: string;
}

export class MessagesFeed extends Block {
  constructor(props: MessagesFeedProps) {
    debugger;
    super({
      messagesFeedHeader: new MessagesFeedHeader({ avatar: props.selectedChatAvatar, name: props.selectedChatTitle }),
      messagesFeedFooter: new MessagesFeedFooter(),
    });
  }

  componentDidUpdate() {
    if (this.props.messages) {
      this.children.messages = this.props.messages
        .map((message: MessageModel) => ({
          ...message,
          sent: message.user_id === this.props.userId,
          time: formatDate(message.time),
        }))
        .map((message: MessageModel) => new Message({ message }));
    }

    if (this.props.selectedChatAvatar) {
      console.log(this.children.messagesFeedHeader);
      console.log(this.children.messagesFeedHeader);
      debugger;
    }
    return true;
  }

  render() {
    return `<div class="messages-feed">
                {{{messagesFeedHeader}}}
                <main class="messages-feed__main">
                  {{#if messages}}
                    {{#each messages}}
                      {{{this}}}
                    {{/each}}
                  {{else}}
                    <span class="messages-feed__no-data">Выберите чат чтобы отправить сообщение</span>
                  {{/if}}
                </main>
                {{{messagesFeedFooter}}}
            </div>`;
  }
}
