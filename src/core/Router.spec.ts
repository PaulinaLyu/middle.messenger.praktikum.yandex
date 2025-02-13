import { JSDOM } from 'jsdom';
import { afterEach, beforeEach } from 'mocha';
import { expect } from 'chai';
import { Router } from './Router.ts';
import { LoginPage } from '@/pages';
import { Routes } from '@/types';
import Block from './Block.ts';

describe('Router', () => {
  const html = '<!DOCTYPE html><html><body><div id="app"></div></body></html>';
  beforeEach(() => {
    const { window } = new JSDOM(html, { url: 'https://localhost' });
    global.document = window.document;
  });

  afterEach(() => {
    Router.destroy();
    window.history.replaceState({}, '', '/');
  });

  it('должен отображать страницу по заданному маршруту', () => {
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
    const heading = appElement?.querySelector('h1');
    expect(heading).not.to.be.a('null');
    expect(heading!.textContent).to.equal('Регистрация');
  });

  it('должен возращаться на предыдущую страницу', async () => {
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
    const heading = appElement?.querySelector('h1');
    expect(heading).not.to.be.a('null');
    expect(heading!.textContent).to.equal('Вход');
  });

  it('должен совершать шаг вперед по истории', async () => {
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
    const heading = appElement?.querySelector('h1');
    expect(heading).not.to.be.a('null');
    expect(heading!.textContent).to.equal('Регистрация');
  });
});

describe('Router Singleton', () => {
  it('единственный экземпляр', () => {
    const routerInstance1 = Router.getInstance();
    const routerInstance2 = Router.getInstance();

    expect(routerInstance1).to.equal(routerInstance2);
  });

  it('должен уничтожить экземпляр', () => {
    const routerInstance1 = Router.getInstance();

    Router.destroy();

    const routerInstance2 = Router.getInstance();

    expect(routerInstance1).not.to.equal(routerInstance2);
  });
});