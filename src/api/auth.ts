import { HTTPTransport } from "../tools/HTTPTransport";
import { APIError, CreateUser, LoginRequestData, SignUpResponse, UserDTO } from "./type";
import { BASE_URL } from "../consts";

const authApi = new HTTPTransport();

export default class AuthApi {
  async create(data: CreateUser): Promise<SignUpResponse> {
    return authApi.post<SignUpResponse>("/signup", { data });
  }

  async login(data: LoginRequestData): Promise<void | APIError> {
    debugger;
    return authApi.post(`${BASE_URL}/auth/signin`, { data });
  }

  async me(): Promise<UserDTO | APIError> {
    return authApi.get("/user");
  }

  async logout(): Promise<void | APIError> {
    return authApi.post("/logout");
  }
}
