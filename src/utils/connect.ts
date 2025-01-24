import Block from "../core/Block";
import { StoreEvents } from "../core/Store";
import { isEqual } from "./isEqual";

export function connect(mapStateToProps) {
  return function (Component: Block) {
    return class extends Component {
      private onChangeStoreCallback: () => void;
      constructor(props) {
        const store = window.store;

        let state = mapStateToProps(store.getState());

        super({ ...props, ...state });

        // const dispatchHundler = {};
        // Object.entries(dispatch || {}).forEach(([key, hundler]) => {
        //   dispatchHundler[key] = (...args) => hundler(window.store.set.bind(window.store), ...args);
        // });

        // this.setProps({ ...dispatchHundler });

        this.onChangeStoreCallback = () => {
          const newState = mapStateToProps(store.getState());

          if (!isEqual(state, newState)) {
            this.setProps({ ...newState });
          }

          state = newState;
        };

        store.on(StoreEvents.Updated, this.onChangeStoreCallback);
      }

      componentWillUnmount() {
        super.componentWillUnmount();
        window.store.off(StoreEvents.Updated, this.onChangeStoreCallback);
      }
    };
  };
}
