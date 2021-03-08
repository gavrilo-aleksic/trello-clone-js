import { BaseComponent } from "../../../../core/components/base.component";
import Sortable from "sortablejs";
import { ModalComponent } from "../../../shared/modal/modal.component";
import { CardModel } from "../../models/card.model";
import { CardDetailsComponent } from "../card-details/card-details.component";
import { CardComponent } from "../card/card.component";
import htmlContent from "./list.component.html";
import { TrelloService } from "../../../../core/api/trello.service";

export class ListComponent extends BaseComponent {
  constructor({ container, props, }) {
    super({ container, htmlContent, });
    this.trelloService = new TrelloService();
    this.list = props.list;
    this.cards = props.cards;
    this.init();
  }

  init() {
    this.nameElement = this.container.querySelector(".list-name");
    this.nameElement.innerText = this.list.name;
    this.listContent = this.container.querySelector(".list-content");
    this.cards.forEach((card) => {
      const cardElement = new CardComponent({ props: { card, }, });
      this.listContent.appendChild(cardElement.container);
    });
    this.listContent.list = this.list;
    this.listContent.cards = this.cards;
    this.createNewCardButton = this.container.querySelector(".list-new-card");
    this.createNewCardButton.addEventListener("click", () => {
      const newCardElement = new CardDetailsComponent({
        props: {
          card: new CardModel({
            desc: "Description",
            name: "Title",
          }),
        },
      });
      ModalComponent.show({ content: newCardElement.container, });
    });

    this.sortable = Sortable.create(this.listContent, {
      group: "shared",
      draggable: ".card-wrapper",
      sort: true,
      handle: ".card-wrapper",
      onSort: (e) => {
        console.log("SORT", e);
        const toList = e.to;
        const fromList = e.from;
        const card = e.item.card;

        const previousPos = toList.cards[e.oldIndex - 1]
          ? toList.cards[e.oldIndex - 1].pos
          : toList.list.id === fromList.list.id ? toList.cards[e.oldIndex].pos : card.pos;
        const nextPos = toList.cards[e.oldIndex + 1]
          ? toList.cards[e.oldIndex + 1].pos
          : toList.list.id === fromList.list.id ? toList.cards[e.oldIndex].pos : card.pos;

        const newPos = (nextPos + previousPos) / 2;
        console.log("Changing POS", {currentPos: card.pos, newIndex: e.newIndex, oldIndex: e.oldIndex, previousPos, nextPos, newPos, toList: toList.cards, });
        // this.trelloService
        //   .updateCard(card.id, {
        //     pos: newPos,
        //     idList: toList.id !== fromList.list.id ? toList.list.id : undefined,
        //   })
        //   .then((e) => {
        //     card.pos = newPos;
        //   });
      },
    });
  }
}
