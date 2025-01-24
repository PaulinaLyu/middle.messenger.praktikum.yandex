import authAPI from "@/api/auth-api.ts";
import store from "@/core/Store.ts";
import { AuthSignupRequest, AuthSignInRequest, Routes } from "@/types/index.ts";
import { UserModel } from "@/types/models/User";

export class AuthController {
  static async signin(data: AuthSignInRequest) {
    try {
      await authAPI.signin(data);
      await this.fetchUser();
      window.router.go(Routes.Chats);
      debugger;
    } catch (error) {
      console.log(error, "sign in error");
    }
  }

  static async signup(data: AuthSignupRequest) {
    try {
      await authAPI.signup(data);
      await this.fetchUser();
      window.router.go(Routes.Chats);
    } catch (error) {
      console.log(error, "sign up error");
    }
  }

  static async logout() {
    try {
      await authAPI.logout();
      store.set("user", undefined);
      window.router.go(Routes.Login);
    } catch (error) {
      console.log(error, "log out error");
    }
  }

  static async fetchUser() {
    const user = await authAPI.getUser();
    store.set("user", user as UserModel);
  }
}
