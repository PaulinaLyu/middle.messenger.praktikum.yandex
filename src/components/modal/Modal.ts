import { Button } from "..";
import Block from "../../core/Block";

interface ModalProps {
  id: string | number;
  title: string;
  btnText: string;
  children: Block;
  isShow: boolean;
}

export class Modal extends Block {
  constructor(props: ModalProps) {
    super({
      id: props.id,
      title: props.title,
      button: new Button({
        text: props.btnText,
        className: "modal__footer__btn",
        onClick: () => {
          this.setProps({ isShow: false });
        },
      }),
      isShow: props.isShow,
      children: props.children,
    });
  }

  render() {
    return `<div class="modal${this.props.isShow ? " modal--show" : ""}" id={{id}}>
      <div class="modal__content">
        <h3 class="modal__content__title">{{title}}</h3>
        {{{children}}}
        <div class="modal__footer">
          {{{button}}}
        </div>
      </div>
    </div>`;
  }
}
