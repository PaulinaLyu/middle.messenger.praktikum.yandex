import EventBus from "./EventBus";

export enum StoreEvents {
  Updated = "Updated",
}

export class Store<T extends Record<string, unknown>> extends EventBus {
  private static __instance: Store<any> | null = null;
  private state!: T;

  constructor(defaultState: T) {
    if (Store.__instance) {
      return Store.__instance;
    }
    super();

    this.state = defaultState;
    this.set(defaultState, false);
    Store.__instance = this;
  }

  public getState(): T {
    return this.state;
  }

  public set(nextState: Partial<T>, emitUpdate: boolean = true): void {
    const prevState = { ...this.state };
    debugger;
    this.state = { ...this.state, ...nextState };
    debugger;
    if (emitUpdate) {
      this.emit(StoreEvents.Updated, prevState, nextState);
    }
  }
}
