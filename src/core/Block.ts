import EventBus from "./EventBus";
import Handlebars from "handlebars";

type EventHandlers = {
  [K in keyof HTMLElementEventMap]?: (event: HTMLElementEventMap[K]) => void;
};

export interface BlockProps {
  [key: string]: unknown;
  events?: EventHandlers;
  attr?: { [key: string]: string | boolean };
}
interface Children {
  [key: string]: Block;
}

export default class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  private _element: HTMLElement | null = null;
  private id: number = Math.floor(100000 + Math.random() * 900000);
  private eventBus: () => EventBus;
  protected props: BlockProps;
  protected children: Children;
  // protected lists: Lists;

  constructor(propsWithChildren: BlockProps = {}) {
    const eventBus = new EventBus();

    const { children, props } = this._getChildrenAndProps(propsWithChildren);

    this.children = children;
    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  // constructor(propsWithChildren: BlockProps = {}) {
  //   const eventBus = new EventBus();
  //   const { props, children } = this._getChildrenAndProps(propsWithChildren);
  //   this.props = this._makePropsProxy({ ...props });
  //   this.children = children;
  //   // this.lists = lists;
  //   this.eventBus = () => eventBus;
  //   this._registerEvents(eventBus);
  //   eventBus.emit(Block.EVENTS.INIT);
  // }

  private _addEvents(): void {
    const { events = {} } = this.props;

    Object.keys(events).forEach(eventName => {
      const eventKey = eventName as keyof HTMLElementEventMap;

      const handler = events[eventKey] as (event: Event) => void;
      this._element?.addEventListener(eventKey, handler);
    });
  }

  private _removeEvents(): void {
    const { events = {} } = this.props;

    Object.keys(events).forEach(eventName => {
      const eventKey = eventName as keyof HTMLElementEventMap;
      const handler = events[eventKey] as (event: Event) => void;
      this._element?.removeEventListener(eventKey, handler);
    });
  }

  private _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _init() {
    this.init();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected init() {}
  // _componentDidMount() {
  //   this.componentDidMount();
  // }

  // protected componentDidMount() {}

  protected componentDidMount() {}

  private _componentDidMount(): void {
    this.componentDidMount();
    // Object.values(this.children).forEach(child => {
    //   child.dispatchComponentDidMount();
    // });
  }

  public dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    Object.values(this.children).forEach(child => {
      if (Array.isArray(child)) {
        child.forEach(c => c.dispatchComponentDidMount());
      } else {
        child.dispatchComponentDidMount();
      }
    });
  }

  // private _componentDidUpdate(...args: unknown[]): void {
  //   const [oldProps, newProps] = args as [BlockProps, BlockProps];
  //   const response = this.componentDidUpdate(oldProps, newProps);

  //   if (!response) {
  //     return;
  //   }

  //   this._render();
  // }

  private _componentDidUpdate() {
    if (this.componentDidUpdate()) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  protected componentDidUpdate() {
    return true;
  }

  // private _componentDidUpdate() {
  //   if (this.componentDidUpdate()) {
  //     this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  //   }
  // }

  // protected componentDidUpdate() {
  //   return true;
  // }

  // private _getChildrenPropsAndProps(propsAndChildren: BlockProps): { children: Children; props: BlockProps; lists: Lists } {
  //   const children: Children = {};
  //   const props: BlockProps = {};
  //   const lists: Lists = {};

  //   Object.entries(propsAndChildren).forEach(([key, value]) => {
  //     if (value instanceof Block) {
  //       children[key] = value;
  //     } else if (Array.isArray(value)) {
  //       lists[key] = value;
  //     } else {
  //       props[key] = value;
  //     }
  //   });

  //   return { children, props, lists };
  // }

  private _getChildrenAndProps(childrenAndProps: BlockProps): { children: Children; props: BlockProps } {
    const props: BlockProps = {};
    const children: Children = {};

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key as string] = value;
      } else {
        props[key] = value;
      }
    });

    return {
      props: props as BlockProps,
      children,
    };
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

  public setProps = (nextProps: BlockProps): void => {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  };

  public get element(): HTMLElement | null {
    return this._element;
  }

  private _render(): void {
    this._removeEvents();

    const propsAndStubs = { ...this.props };

    Object.entries(this.children).forEach(([name, component]) => {
      if (Array.isArray(component)) {
        propsAndStubs[name] = component.map(comp => `<div data-id="${comp.id}"></div>`);
      } else {
        propsAndStubs[name] = `<div data-id="__l_${component.id}"></div>`;
      }
    });

    // Object.entries(this.lists).forEach(([key]) => {
    //   propsAndStubs[key] = `<div data-id="__l_${_tmpId}"></div>`;
    // });

    const renderReturn = this.render();

    const template = Handlebars.compile(renderReturn);
    const fragment = this._createDocumentElement("template");

    fragment.innerHTML = template(propsAndStubs);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(this.children).forEach(([_, component]) => {
      if (Array.isArray(component)) {
        const stubs = component.map(comp => fragment.content.querySelector(`[data-id="${comp.id}"]`));
        if (!stubs.length) {
          return;
        }
        stubs.forEach((stub, index) => {
          component[index].getContent()?.append(...Array.from(stub!.childNodes));
          stub!.replaceWith(component[index].getContent()!);
        });
      } else {
        const stub = fragment.content.querySelector(`[data-id="__l_${component.id}"]`);

        if (!stub) {
          return;
        }
        component.getContent()?.append(...Array.from(stub.childNodes));

        stub.replaceWith(component.getContent()!);
      }
    });

    // Object.values(this.children).forEach(child => {
    //   const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
    //   console.log(child);
    //   debugger;
    //   const childContent = child.getContent();
    //   if (stub && childContent) {
    //     stub.replaceWith(childContent);
    //   }
    // });

    // Object.entries(this.lists).forEach(list => {
    //   const listCont = this._createDocumentElement("template");

    //   list[1].forEach(item => {
    //     if (item instanceof Block) {
    //       const content = item.getContent();

    //       if (content) {
    //         listCont.content.append(content);
    //       }
    //     } else {
    //       listCont.content.append(item as string);
    //     }
    //   });
    //   const stub = fragment.content.querySelector(`[data-id="__l_${_tmpId}"]`);
    //   if (stub) {
    //     stub.replaceWith(listCont.content);
    //   }
    // });

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

  private _makePropsProxy(props: BlockProps): BlockProps {
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

  public show(query: string, render: (query: string, block: Block) => void) {
    this.eventBus().emit(Block.EVENTS.INIT);
    render(query, this);
  }

  public hide(): void {
    const element = this.getContent();
    if (element) {
      element.style.display = "none";
    }
  }
}
