import Block from "./Block";
import { render } from "../../utils/renderDOM";
import { isEqual } from "../utils/isEqual";

interface Route {
  pathname: string;
  block: Block;
  match(pathname: string): boolean;
  leave(): void;
  render(route: Route, pathname: string): void;
}

export class Router {
  private static __instance: Router;
  private routes: Route[];
  private history: History;
  private _currentRoute: Route | null;

  constructor() {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;

    Router.__instance = this;
  }

  // Method to register a route
  use(pathname: string, block: Block): Router {
    const route: Route = new RouteImpl(pathname, block); // Assuming RouteImpl is the actual implementation of Route
    this.routes.push(route);
    return this;
  }

  // Method to start listening to route changes
  start(): void {
    window.onpopstate = event => {
      this._onRoute(event.currentTarget.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  // Internal method to handle route changes
  private _onRoute(pathname: string): void {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    route.render(route, pathname);
    this._currentRoute = route;
  }

  // Method to navigate to a new route
  go(pathname: string): void {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  // Method to find a route by pathname
  getRoute(pathname: string): Route | undefined {
    return this.routes.find(route => route.match(pathname));
  }
}

interface RouteImplProps {
  rootQuery: string;
}

export default class RouteImpl {
  private _pathname: string;
  private _blockClass: new () => Block;
  private _block: Block | null;
  private _props: RouteImplProps;

  constructor(pathname: string, view: new () => Block, props: RouteImplProps) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string): void {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave(): void {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string): boolean {
    return isEqual<typeof pathname>(this._pathname, pathname);
  }

  render(): void {
    if (!this._block) {
      this._block = new this._blockClass();
      render(this._props.rootQuery, this._block);

      return;
    }

    this._block.show();
  }
}
