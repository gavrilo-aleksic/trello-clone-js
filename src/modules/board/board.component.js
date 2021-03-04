import htmlContent from "./board.component.html";
import { BaseComponent } from "../../core/components/base.component";
import { TrelloService } from "../../core/api/trello.service";
import { ListComponent } from "./components/list/list.component";

export class BoardComponent extends BaseComponent {
  constructor({container, props}) {
    console.log(props);
    super({container, htmlContent});
    this.trelloService = new TrelloService();
    this.init(props.board);
  }

  async init(board) {
    const { backgroundColor, backgroundImage } = board.prefs;
    if(backgroundColor) {
        this.container.style.backgroundColor = backgroundColor;
    } else if(backgroundImage) {
        this.container.style.backgroundImage = `url(${backgroundImage})`;
    }
    this.listsWrapper = this.container.querySelector(".lists-wrapper");
    this.cards = await this.trelloService.getBoardCards(board.id);
    this.getLists(board.id);
  }

  getLists(boardId) {
    this.trelloService.getBoardLists(boardId).then((lists) => {
      lists.forEach((list) => {
        const listWrapper = document.createElement("div");
        const listElement = new ListComponent({props: {list,cards:this.cards.filter(card=>card.idList === list.id)}});
        this.listsWrapper.appendChild(listElement.container);
      });
    });
  }
}
