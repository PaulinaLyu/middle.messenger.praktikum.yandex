import Block from "../../tools/Block";
import { Button } from "..";

interface InputFileProps {
  isMultiple?: boolean;
  id: string | number;
  name: string;
  accept: string;
}

export class InputFile extends Block {
  constructor(props: InputFileProps) {
    super({
      button: new Button({
        text: "Выбрать файл на компьютере",
        underline: true,
        isGhost: true,
        onClick: () => {},
      }),
      multiple: props.isMultiple || false,
      id: props.id || false,
      accept: props.accept,
      // input: new Input({
      //   className: "inputFile__input",
      //   type: "file",

      //   id: props.id,
      //   name: props.name,
      //   accept: props.accept,
      // }),
    });
  }

  render() {
    return `
      <div class="inputFile">
        <input class="inputFile__input" type="file" multiple={{multiple}} id={{id}} name={{name}} accept={{accept}} />
        {{{button}}}
      </div>
    `;
  }
}
