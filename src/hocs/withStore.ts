import store, { State, StoreEvents } from "@/core/Store.ts";
import Block, { BlockProps } from "@/core/Block.ts";
import { isEqual } from "@/utils/isEqual.ts";

export const withStore =
  <P extends BlockProps>(mapStateToProps: (state: State) => P) =>
  (Component: new (props: P) => Block) =>
    class extends Component {
      constructor(props: P) {
        let state = mapStateToProps(store.getState());
        debugger;
        super({ ...props, ...mapStateToProps(store.getState()) });
        debugger;
        store.on(StoreEvents.Updated, () => {
          const propsFromState = mapStateToProps(store.getState());
          debugger;
          if (!isEqual(state, propsFromState)) {
            debugger;
            this.setProps({ ...propsFromState });
          }
          debugger;
          state = propsFromState;
        });
      }
    };

