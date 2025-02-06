import store, { State, StoreEvents } from "@/core/Store.ts";
import Block, { BlockProps } from "@/core/Block.ts";
import { isEqual } from "@/utils/isEqual.ts";

export const withStore =
  (mapStateToProps: (state: State) => any) =>
  <P extends BlockProps>(Component: typeof Block<P>) =>
    class extends Component {
      constructor(props: P) {
        let state = mapStateToProps(store.getState());
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

//     import store, { State, StoreEvents } from '../core/Store.ts';
// import Block from '../core/Block.ts';
// import { isEqual } from '../utils/isEqual.ts';

// export const withStore = (mapStateToProps: (state: State) => any) => <P extends Record<string, unknown>>(Component: typeof Block<P>) => class extends Component {
//   constructor(props: P) {
//     let state = mapStateToProps(store.getState());
//     super({ ...props, ...mapStateToProps(store.getState()) });
//     store.on(StoreEvents.Updated, () => {
//       const propsFromState = mapStateToProps(store.getState());
//       if (!isEqual(state, propsFromState)) {
//         this.setProps({ ...propsFromState });
//       }
//       state = propsFromState;
//     });
//   }
// };
