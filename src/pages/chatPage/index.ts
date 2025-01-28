import { State } from "@/core/Store";
import "./chatPage.scss";
import { withStore } from "@/hocs/withStore";
import { ChatPage as BaseChat } from "./ChatPage";


const mapStateToProps = (state: State) => ({
    chatsList: state.chats,
    selectedChat: state.selectedChat?.[0],
  });
  
  export const ChatPage = withStore(mapStateToProps)(BaseChat);