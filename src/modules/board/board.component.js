import htmlContent from "./board.component.html";
import { BaseComponent } from "../../core/components/base.component";
import { TrelloService } from "../../core/api/trello.service";
import { ListComponent } from "./components/list/list.component";
import { ButtonComponent } from '../shared/button/button.component';

export class BoardComponent extends BaseComponent {
  constructor({ container, props, }) {
    super({ container, htmlContent, });
    this.trelloService = new TrelloService();
    this.board = props.board;
    this.init();
  }

  async init() {
    this.listsWrapper = this.container.querySelector(".lists-wrapper");
    this.setBackground();
    this.setHeader();
    await this.getCards();
    this.setLists();
  }
  
  setHeader() {
    this.headerElement = this.container.querySelector('.board-header');
    const boardNameElement = new ButtonComponent({props: {label: this.board.name, }, });
    this.headerElement.appendChild(boardNameElement.container);
  }

  setBackground() {
    const { backgroundColor, backgroundImage, } = this.board.prefs;
    if (backgroundColor) {
      document.body.style.backgroundColor = backgroundColor;
    } else if (backgroundImage) {
      document.body.style.backgroundImage = `url(${backgroundImage})`;
    }
  }

  async getCards() {
    this.cards = await this.trelloService.getBoardCards(this.board.id);
  }

  setLists() {
    this.lists = this.board.lists;
    this.lists.forEach((list) => {
      const listElement = new ListComponent({
        props: {
          list,
          cards: this.cards.filter((card) => card.idList === list.id),
        },
      });
      this.listsWrapper.appendChild(listElement.container);
    });
  }
}
