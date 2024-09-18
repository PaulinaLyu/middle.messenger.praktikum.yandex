import { isEqual } from "../utils/isEqual";
import Block from "./Block";

function render(query: string, block: Block): HTMLElement | null {
  const root = document.querySelector(query) as HTMLElement | null;
  if (root) {
    root.innerHTML = ``;
    root.appendChild(block.getContent()!);
  }

  return root;
}

type Props = {
  rootQuery: string;
};

class Route {
  private _pathname: string;
  private _blockClass: Block;
  private _block: Block | null;
  private _props: Props;

  constructor(pathname: string, view: Block, props: Props) {
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
    return isEqual(pathname, this._pathname);
  }

  render(): void {
    if (!this._block) {
      this._block = new this._blockClass(this._props);

      render(this._props.rootQuery, this._block);

      return;
    }

    this._block.show();
  }
}

export class Router {
  private static __instance: Router;
  private routes: Route[] = [];
  private history: History = window.history;
  private _currentRoute: Route | null = null;
  private _rootQuery: string = "";

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  public use(pathname: string, block: Block, props): this {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery, ...props });
    this.routes.push(route);
    return this;
  }

  public start(): void {
    window.onpopstate = (event: PopStateEvent) => {
      const target = event.currentTarget as Window;
      this._onRoute(target?.location.pathname || "/");
    };

    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string): void {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }
    this._currentRoute = route;

    route.render(route, pathname);
  }

  public go(pathname: string): void {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  public back(): void {
    this.history.back();
  }

  public forward(): void {
    this.history.forward();
  }

  private getRoute(pathname: string): Route | undefined {
    const foundRoute = this.routes.find(route => route.match(pathname));
    if (!foundRoute) {
      return this.routes.find(route => route.match("*"));
    }
    return foundRoute;
  }
}
