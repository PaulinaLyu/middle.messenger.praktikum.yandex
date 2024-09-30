import { HTTPTransport } from "../tools/HTTPTransport";
import { APIError, CreateUser, LoginRequestData, SignUpResponse, UserDTO } from "./type";
import { apiYandex } from "../consts";

const authApi = new HTTPTransport();

export default class AuthApi {
  async create(data: CreateUser): Promise<SignUpResponse> {
    return authApi.post<SignUpResponse>("/signup", { data });
  }

  async login(data: LoginRequestData): Promise<void | APIError> {
    debugger;
    return authApi.post(`${apiYandex}/auth/signin`, { data });
  }

  async me(): Promise<UserDTO | APIError> {
    return authApi.get("/user");
  }

  async logout(): Promise<void | APIError> {
    return authApi.post("/logout");
  }
}
