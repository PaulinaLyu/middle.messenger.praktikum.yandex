import EventBus from "./EventBus";
import Handlebars from "handlebars";

type EventHandlers = {
  [K in keyof HTMLElementEventMap]?: (event: HTMLElementEventMap[K]) => void;
};

interface Props {
  [key: string]: unknown;
  events?: EventHandlers;
  attr?: { [key: string]: string | boolean };
}
interface Children {
  [key: string]: Block;
}

interface Lists {
  [key: string]: (Block | string)[];
}

export default class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  private _element: HTMLElement | null = null;
  private _id: number = Math.floor(100000 + Math.random() * 900000);
  private eventBus: () => EventBus;
  protected props: Props;
  protected children: Children;
  protected lists: Lists;

  constructor(propsWithChildren: Props = {}) {
    const eventBus = new EventBus();
    const { props, children, lists } = this._getChildrenPropsAndProps(propsWithChildren);
    this.props = this._makePropsProxy({ ...props });
    this.children = children;
    this.lists = lists;

    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _addEvents(): void {
    const { events = {} } = this.props;

    Object.keys(events).forEach(eventName => {
      const eventKey = eventName as keyof HTMLElementEventMap;

      const handler = events[eventName] as (event: Event) => void;
      this._element?.addEventListener(eventKey, handler);
    });
  }

  private _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  protected init(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount(): void {
    // this.componentDidMount();
    Object.values(this.children).forEach(child => {
      child.dispatchComponentDidMount();
    });
  }

  protected dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: Props, newProps: Props): void {
    const response = this.componentDidUpdate(oldProps, newProps);

    if (!response) {
      return;
    }
    this._render();
  }

  protected componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    console.log(oldProps, newProps);
    return true;
  }

  private _getChildrenPropsAndProps(propsAndChildren: Props): { children: Children; props: Props; lists: Lists } {
    const children: Children = {};
    const props: Props = {};
    const lists: Lists = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (Array.isArray(value)) {
        lists[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props, lists };
  }

  private addAttributes(): void {
    const { attr = {} } = this.props;

    Object.entries(attr).forEach(([key, value]) => {
      if (typeof value === "boolean") {
        if (value) {
          this._element?.setAttribute(key, String(value));
        }
      } else {
        this._element?.setAttribute(key, String(value));
      }
    });
  }

  public setProps = (nextProps: Props): void => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  public get element(): HTMLElement | null {
    return this._element;
  }

  private _render(): void {
    const propsAndStubs = { ...this.props };
    const _tmpId = Math.floor(100000 + Math.random() * 900000);

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    Object.entries(this.lists).forEach(([key]) => {
      propsAndStubs[key] = `<div data-id="__l_${_tmpId}"></div>`;
    });

    const renderReturn = this.render();

    const template = Handlebars.compile(renderReturn);
    const fragment = this._createDocumentElement("template");

    fragment.innerHTML = template(propsAndStubs);

    Object.values(this.children).forEach(child => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
      const childContent = child.getContent();

      if (stub && childContent) {
        stub.replaceWith(childContent);
      }
    });

    Object.entries(this.lists).forEach(list => {
      const listCont = this._createDocumentElement("template");
      list[1].forEach(item => {
        if (item instanceof Block) {
          const content = item.getContent();
          if (content) {
            listCont.content.append(content);
          }
        } else {
          listCont.content.append(item as string);
        }
      });
      const stub = fragment.content.querySelector(`[data-id="__l_${_tmpId}"]`);
      if (stub) {
        stub.replaceWith(listCont.content);
      }
    });

    const newElement = fragment.content.firstElementChild as HTMLElement;
    if (this._element) {
      this._element.replaceWith(newElement);
    }
    this._element = newElement;

    this._addEvents();
    this.addAttributes();
  }

  protected render(): string {
    return "";
  }

  public getContent(): HTMLElement | null {
    return this.element;
  }

  private _makePropsProxy(props: Props): Props {
    const self = this;

    return new Proxy(props, {
      get(target, prop: string) {
        if (prop.startsWith("_")) {
          throw new Error("Нет прав");
        } else {
          const value = target[prop];
          return typeof value === "function" ? value.bind(target) : value;
        }
      },

      set(target, prop: string, value) {
        if (prop.startsWith("_")) {
          throw new Error("Нет прав");
        } else {
          const oldTarget = { ...target };
          target[prop] = value;
          self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
          return true;
        }
      },

      deleteProperty(target, prop: string) {
        if (prop.startsWith("_")) {
          throw new Error("Нет прав");
        } else {
          delete target[prop];
          return true;
        }
      },
    });
  }

  private _createDocumentElement(tagName: string): HTMLTemplateElement {
    return document.createElement(tagName) as HTMLTemplateElement;
  }

  public show(): void {
    const element = this.getContent();
    if (element) {
      element.style.display = "block";
    }
  }

  public hide(): void {
    const element = this.getContent();
    if (element) {
      element.style.display = "none";
    }
  }
}
