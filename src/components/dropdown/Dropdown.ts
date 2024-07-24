import { Button, DropdownOptionItem, DropdownOptionItemProps } from "..";
import Block from "../../tools/Block";

interface DropdownProps {
  iconSrc: string;
  position?: string;
  options: Omit<DropdownOptionItemProps, "onClick">[];
  isOpen: boolean;
}

export class Dropdown extends Block {
  constructor(props: DropdownProps) {
    super({
      button: new Button({
        isCircle: true,
        isGhost: true,
        className: "dropbtn",
        text: `<img class="dropbtn__content" src=${props.iconSrc} />`,
        onClick: () => {
          this.setProps({ isOpen: !this.props.isOpen });
        },
      }),
      position: props.position || "bottom",
      isOpen: props.isOpen,
      lists: props.options.map(
        option =>
          new DropdownOptionItem({
            text: option.text,
            iconSrc: option.iconSrc,
            onClick: () => {
              this.setProps({ isOpen: false });
            },
          }),
      ),
    });
  }
  render() {
    return `<div class="dropdown">
        {{{button}}}
        <div class="dropdown-content dropdown-content--${this.props.position ? this.props.position : "bottom"}${this.props.isOpen ? " dropdown-content--show" : ""}" >
            <div class="dropdown-content-card">
              {{{lists}}}
            </div>
          </div>
        </div>`;
  }
}
