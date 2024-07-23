import { Button, DropdownOptionItem, DropdownOptionItemProps } from "..";
import Block from "../../tools/Block";

interface DropdownProps {
  iconSrc: string;
  position: string;
  options: DropdownOptionItemProps[];
}

export class Dropdown extends Block {
  constructor(props: DropdownProps) {
    super({
      ...props,
      iconSrc: props.iconSrc,
      button: new Button({ isCircle: true, isGhost: true, className: "dropbtn", text: '<img class="dropbtn__content" src={{iconSrc}} />', onClick: () => console.log("Клик") }),
      lists: props.options.map(option => new DropdownOptionItem({ text: option.text, iconSrc: option.iconSrc })),
    });
  }
  render() {
    return `<div class="dropdown">
        {{{button}}}
        <div class="dropdown-content dropdown-content--{{#if position}}{{position}}{{else }}bottom{{/if}}" >
            <div class="dropdown-content-card">
                {{{lists}}}
            </div>
        </div>
    </div>`;
  }
}
