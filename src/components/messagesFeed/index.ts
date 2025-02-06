import "./messagesFeed.scss";
import { MessagesFeed as BaseMessages, MessagesFeedProps } from "./MessagesFeed";
import { withStore } from "@/hocs/withStore";
import { State } from "@/core/Store";

const mapStateToProps = (state: State): MessagesFeedProps => ({
  messages: state.currentMessages || [],
  userId: state.user?.id,
  selectedChatTitle: state?.selectedChat?.[0]?.title ?? "",
  selectedChatAvatar: state?.selectedChat?.[0]?.avatar ?? "",
});

export const MessagesFeed = withStore<MessagesFeedProps>(mapStateToProps)(BaseMessages);
