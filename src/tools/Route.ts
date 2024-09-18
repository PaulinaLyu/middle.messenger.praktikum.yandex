import Block from "./Block";
import { isEqual } from "../utils/isEqual";

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

export class Route {
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
