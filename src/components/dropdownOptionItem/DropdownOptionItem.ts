import Block from "../../core/Block";

export interface DropdownOptionItemProps {
  text: string;
  iconSrc: string;
  onClick: (value: MouseEvent) => void;
}

export class DropdownOptionItem extends Block {
  constructor(props: DropdownOptionItemProps) {
    super({
      ...props,
      text: props.text,
      iconSrc: props.iconSrc,
      events: {
        click: (e: MouseEvent) => {
          props.onClick(e);
        },
      },
    });
  }
  render() {
    return `<div class="dropdown-option-item">
        <img class="dropdown-option-item__icon" width="22px" height="22px" alt="{{text}} icon" src={{iconSrc}} /><img />
        <span>{{text}}</span>
    </div>`;
  }
}
