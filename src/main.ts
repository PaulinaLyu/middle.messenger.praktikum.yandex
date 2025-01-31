import "./main.scss";
import * as Mocks from "./mocks";
import { Router } from "./core/Router";
import { ErrorPage, ChatPage, ProfilePage, LoginPage } from "./pages";
import { Routes } from "./types";
import { AuthController } from "./controllers/auth";

window.addEventListener("DOMContentLoaded", async () => {
  Router.getInstance()
    .use(Routes.Home, LoginPage, {
      isRegistration: false,
      buttonText: "Войти",
      title: "Вход",
      linkText: "Нет аккаунта?",
      linkPage: "sign-up",
    })
    .use(Routes.Register, LoginPage, {
      isRegistration: true,
      buttonText: "Зарегистрироваться",
      title: "Регистрация",
      linkText: "Вход",
      linkPage: "/",
    })
    .use(Routes.Chats, ChatPage, {})
    .use(Routes.Profile, ProfilePage, {
      isChangePass: false,
      disabled: true,
      isShowModal: false,
    })
    .use(Routes.EditPassword, ProfilePage, {
      isChangePass: true,
      disabled: false,
      isShowModal: false,
    })
    .use(Routes.EditProfile, ProfilePage, {
      isChangePass: false,
      disabled: false,
      isShowModal: false,
    })
    .use(Routes.NotFound, ErrorPage, {
      title: "Не туда попали",
      error: "404",
      linkPage: "messenger",
      linkText: "Назад к чатам",
    });

  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case Routes.Home:
    case Routes.Register:
      isProtectedRoute = false;
      break;
  }

  try {
    await AuthController.fetchUser();
    Router.getInstance().start();
    if (!isProtectedRoute) {
      Router.getInstance().go(Routes.Profile);
    }
  } catch (error) {
    Router.getInstance().start();
    if (isProtectedRoute) {
      Router.getInstance().go(Routes.Home);
    }
  }
});
