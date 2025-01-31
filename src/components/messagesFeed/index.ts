import "./messagesFeed.scss";
import { MessagesFeed as BaseMessages } from "./MessagesFeed";
import { withStore } from "@/hocs/withStore";
import { State } from "@/core/Store";

const mapStateToProps = (state: State) => ({
  messages: state.currentMessages,
  userId: state.user?.id,
  selectedChatTitle: state?.selectedChat?.title,
  selectedChatAvatar: state?.selectedChat?.avatar,
});

export const MessagesFeed = withStore(mapStateToProps)(BaseMessages);
