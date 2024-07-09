//@ts-nocheck
import Block from "../../tools/Block";

export class Test extends Block {
  constructor(props: TestProps) {
    super({
      ...props,
    });
  }

  render() {
    return TestTemplate;
  }
}
