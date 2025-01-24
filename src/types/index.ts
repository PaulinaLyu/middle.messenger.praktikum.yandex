export enum Routes {
  Chats = "/messenger",
  EditPassword = "/edit-password",
  EditProfile = "/settings",
  Error = "/500",
  Home = "/",
  Login = "/login",
  NotFound = "/404",
  Profile = "/profile",
  Register = "/sign-up",
}

export type { AuthSignupRequest, AuthSignupResponse, AuthSignInRequest } from "./Auth/Auth.dto";
