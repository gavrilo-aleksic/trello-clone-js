import { BaseComponent } from "../../../../core/components/base.component";
import Sortable from "sortablejs";
import { ModalComponent } from "../../../shared/modal/modal.component";
import { CardModel } from "../../models/card.model";
import { CardDetailsComponent } from "../card-details/card-details.component";
import { CardComponent } from "../card/card.component";
import { TrelloService } from "../../../../core/api/trello.service";
import { store } from '../../../../index';
import { STORE_KEYS } from '../../../../core/store/actions';
import { getStoreValue } from '../../../../core/store/util';
import htmlContent from "./list.component.html";

export class ListComponent extends BaseComponent {
  constructor({ container, props, }) {
    super({ container, htmlContent, });
    this.trelloService = new TrelloService();
    this.list = props.list;
    this.cards = props.cards;
    this.initSubscribers();
    this.init();
  }

  initSubscribers() {
    store.subscribe(() => {
      const newCard = getStoreValue(STORE_KEYS.NEW_CARD);
      if (newCard && newCard.idList === this.list.id) {
        this.cards.push(newCard);
        this.addCard(newCard);
      }
    }
    
    )
  }

  init() {
    this.nameElement = this.container.querySelector(".list-name");
    this.nameElement.innerText = this.list.name;
    this.listContent = this.container.querySelector(".list-content");
    this.cards.forEach((card) => {
      this.addCard(card);
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
            idList: this.list.id,
          }),
          list: this.list,
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
        const toList = e.to;
        const fromList = e.from;
        const card = e.item.card;

        let previousPos = toList.cards[e.newIndex]
          ? toList.cards[e.newIndex].pos 
          : card.pos;
        
        if (toList.list.id !== fromList.list.id && toList.cards.length > 0) {
          previousPos = toList.cards[e.newIndex - 1].pos;
        }
        const newPos = e.newIndex > e.oldIndex ? previousPos + 1 : previousPos - 1;
        this.trelloService
          .updateCard(card.id, {
            pos: newPos,
            idList: toList.id !== fromList.list.id ? toList.list.id : undefined,
          })
          .then((e) => {
            card.pos = newPos;
          });
      },
    });
  }

  addCard(card) {
    const cardElement = new CardComponent({ props: { card, list: this.list, }, });
    this.listContent.appendChild(cardElement.container);
  }
}
