import { JSDOM } from 'jsdom';
import { afterEach, beforeEach } from 'mocha';
import { expect } from 'chai';
import { Router } from './Router.ts';
import { LoginPage } from '@/pages/index.ts';
import { Routes } from '@/types/index.ts';
import Block from './Block.ts';

describe('Router Functionality Test', () => {
  const html = '<!DOCTYPE html><html><body><div id="app"></div></body></html>';
  beforeEach(() => {
    const { window } = new JSDOM(html, { url: 'https://localhost' });
    global.document = window.document;
  });

  afterEach(() => {
    Router.destroy();
    window.history.replaceState({}, '', '/');
  });

  it('should render content on a given route', () => {
    Router.getInstance().use(Routes.Home, LoginPage as typeof Block, {
          isRegistration: false,
          buttonText: "Войти",
          title: "Вход",
          linkText: "Нет аккаунта?",
          linkPage: "sign-up",
        }).use(Routes.Register, LoginPage as typeof Block, {
              isRegistration: true,
              buttonText: "Зарегистрироваться",
              title: "Регистрация",
              linkText: "Вход",
              linkPage: "/",
            })
    Router.getInstance().start();
    Router.getInstance().go('/sign-up');
    const appElement = global.document.querySelector('#app');
    const heading = appElement?.querySelector('h2');
    expect(heading).not.to.be.a('null');
    expect(heading!.textContent).to.equal('Регистрация аккаунта');
  });

  it('should go back', async () => {
    Router.getInstance().use(Routes.Home, LoginPage as typeof Block, {
        isRegistration: false,
        buttonText: "Войти",
        title: "Вход",
        linkText: "Нет аккаунта?",
        linkPage: "sign-up",
      }).use(Routes.Register, LoginPage as typeof Block, {
            isRegistration: true,
            buttonText: "Зарегистрироваться",
            title: "Регистрация",
            linkText: "Вход",
            linkPage: "/",
          })
    Router.getInstance().start();
    Router.getInstance().go('/sign-up');
    Router.getInstance().back();

    await new Promise<void>((resolve) => {
      window.addEventListener('popstate', () => {
        resolve();
      });
    });

    const appElement = global.document.querySelector('#app');
    const heading = appElement?.querySelector('h2');
    expect(heading).not.to.be.a('null');
    expect(heading!.textContent).to.equal('Вход');
  });

  it('should go forward', async () => {
    Router.getInstance().use(Routes.Home, LoginPage as typeof Block, {
        isRegistration: false,
        buttonText: "Войти",
        title: "Вход",
        linkText: "Нет аккаунта?",
        linkPage: "sign-up",
      }).use(Routes.Register, LoginPage as typeof Block, {
            isRegistration: true,
            buttonText: "Зарегистрироваться",
            title: "Регистрация",
            linkText: "Вход",
            linkPage: "/",
          })
    Router.getInstance().start();
    Router.getInstance().go(Routes.Register);
    Router.getInstance().back();

    await new Promise<void>((resolve) => {
      window.addEventListener('popstate', () => {
        resolve();
      });
    });

    Router.getInstance().forward();

    await new Promise<void>((resolve) => {
      window.addEventListener('popstate', () => {
        resolve();
      });
    });

    const appElement = global.document.querySelector('#app');
    const heading = appElement?.querySelector('h2');
    expect(heading).not.to.be.a('null');
    expect(heading!.textContent).to.equal('Регистрация аккаунта');
  });
});

describe('Router Singleton Test', () => {
  it('should have a single instance', () => {
    const routerInstance1 = Router.getInstance();
    const routerInstance2 = Router.getInstance();

    expect(routerInstance1).to.equal(routerInstance2);
  });

  it('should destroy the instance', () => {
    const routerInstance1 = Router.getInstance();

    Router.destroy();

    const routerInstance2 = Router.getInstance();

    expect(routerInstance1).not.to.equal(routerInstance2);
  });
});