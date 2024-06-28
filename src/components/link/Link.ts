// import Block from "../../tools/Block";
// import { default as ButtonTemplate } from "./button.hbs?raw";

// export class Button extends Block {
//   constructor(props) {
//     super({
//       ...props,
//       events: {
//         click: () => props.onClick(e.target.value),
//       },
//     });
//   }

//   render() {
//     return ButtonTemplate;
//   }
// }

import Block from "../../tools/Block";
import { default as LinkTemplate } from "./link.hbs?raw";

interface LinkProps {
  className?: string;
}

export class Link extends Block {
  constructor(props: LinkProps) {
    super({
      ...props,
      // events: {
      //   click: (e: MouseEvent) => props.onClick(e),
      // },
    });
  }

  render() {
    debugger;
    return LinkTemplate;
    // return `<button>{{text}}</button>`;
  }
}
