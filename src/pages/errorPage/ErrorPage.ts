import Block from "../../tools/Block";
import { Link } from "../../components/link";
import { Title } from "../../components/title";

interface ErrorPageProps {
  error: string;
  title: string;
  linkText: string;
  linkPage: string;
}

export class ErrorPage extends Block {
  constructor(props: ErrorPageProps) {
    super({
      ...props,
      title: new Title({ title: props.title }),
      link: new Link({
        text: props.linkText,
        page: props.linkPage,
      }),
    });
  }

  override render() {
    return `<main class="error-page">
                <span class="error-page__error">{{error}}</span>
                {{{ title }}}
                {{{ link }}}
            </main>
            `;
  }
}
