import store, { State, StoreEvents } from "@/core/Store.ts";
import Block, { BlockProps } from "@/core/Block.ts";
import { isEqual } from "@/utils/isEqual.ts";

export const withStore =
  (mapStateToProps: (state: State) => any) =>
  <P extends BlockProps>(Component: new (props: P) => Block) =>
    class extends Component {
      constructor(props: P) {
        const testStore = store.getState();
        let state = mapStateToProps(testStore);

        super({ ...props, ...mapStateToProps(store.getState()) });
        store.on(StoreEvents.Updated, () => {
          const propsFromState = mapStateToProps(store.getState());
          if (!isEqual(state, propsFromState)) {
            this.setProps({ ...propsFromState });
          }

          state = propsFromState;
        });
      }
    };
