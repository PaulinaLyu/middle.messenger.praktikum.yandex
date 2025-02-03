import { ChatUserModel } from "@/types/models/Chat";
import chatsAPI from "@/api/chats-api.ts";
import store from "@/core/Store.ts";
import { MessagesController } from "./messages.ts";

export class ChatsController {
  static async create(title: string) {
    try {
      await chatsAPI.createChat(title);
      await this.getChatsList();
    } catch (error) {
      console.log(error, "chat create error");
    }
  }

  static async getChatsList(title?: string) {
    try {
      debugger;
      const chats = await chatsAPI.getChats({ limit: 20, title: title || "" });
      debugger;
      // chats.map(async (chat: ChatModel) => {
      //   const { token } = await this.getToken(chat.id);
      //   await MessagesController.connect(chat.id, token);
      // });
      store.set("chats", chats);
      debugger;
    } catch (error) {
      console.log(error, "get chats list error");
    }
  }

  static async addUserToChat(chatId: number, userId: number[]) {
    try {
      await chatsAPI.addUsers(userId, chatId);
      await this.getChatsList();
    } catch (error) {
      console.log(error, "add user to chat error");
    }
  }

  static async deleteUserFromChat(chatId: number, userId: number[]) {
    try {
      await chatsAPI.deleteUsers(userId, chatId);
      await this.getChatsList();
    } catch (error) {
      console.log(error, "delete user from chat error");
    }
  }

  static async selectChat(chatId: number) {
    const chatsCopy = [...store.getState().chats];
    debugger;
    const target = chatsCopy?.find(chat => chat.id === chatId);
    debugger;
    store.set("selectedChat", target);
    if (target) {
      const { token } = await this.getToken(target.id);
      await MessagesController.connect(target.id, token);
    }
    this.fetchChatUsers(chatId);
  }

  static async fetchChatUsers(chatId: number) {
    try {
      const chatMembers: ChatUserModel[] = await chatsAPI.getChatUsers(chatId);
      debugger;
      const nonAdminMembers = chatMembers.filter(user => user.role !== "admin");
      store.set("selectedChat", {
        ...store.getState().selectedChat,
        members: nonAdminMembers,
      });
    } catch (error) {
      console.log(error, "get chat users error");
    }
  }

  static async deleteChat(chatId: number) {
    try {
      await chatsAPI.delete(chatId);
      store.set("selectedChat", undefined);
      await this.getChatsList();
    } catch (error) {
      console.log(error, "delete the chat error");
    }
  }

  static async getToken(chatId: number) {
    return chatsAPI.getToken(chatId);
  }
}
