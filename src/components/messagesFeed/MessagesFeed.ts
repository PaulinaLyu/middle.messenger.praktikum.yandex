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
    super({
      messagesFeedHeader: new MessagesFeedHeader({ avatar: props.selectedChatAvatar, name: "Чат не выбран" }),
      messagesFeedFooter: new MessagesFeedFooter(),
    });
  }

  componentDidUpdate() {
    debugger;
    if (this.props.messages) {
      debugger;
      const propsMess = this.props.messages as MessageModel[];
      this.children.messages = propsMess
        .map((message: MessageModel) => ({
          ...message,
          sent: message.user_id === this.props.userId,
          time: formatDate(message.time),
        }))
        .map((message: MessageModel) => new Message({ message }));
    } else {
      debugger;
      this.children.messages = [];
    }
    if (Array.isArray(this.children.messagesFeedHeader)) {
      this.children.messagesFeedHeader.forEach(header => header.setProps({ avatar: this.props.selectedChatAvatar || null, name: this.props.selectedChatTitle || "Чат не выбран"}));
    } else {
      this.children.messagesFeedHeader.setProps({ avatar: this.props.selectedChatAvatar, name: this.props.selectedChatTitle });
    }

    return true;
  }

  render() {
    return `<main class="messages-feed">
                {{{messagesFeedHeader}}}
                <ul class="messages-feed__main">
                  {{#if messages}}
                    {{#each messages}}
                      {{{this}}}
                    {{/each}}
                  {{else}}
                    <span class="messages-feed__no-data">Отправте сообщение</span>
                  {{/if}}
                </ul>
                {{{messagesFeedFooter}}}
            </main>`;
  }
}
