import { BaseComponent } from "../../../../core/components/base.component";
import { ModalComponent } from "../../../shared/modal/modal.component";
import { CardDetailsComponent } from "../card-details/card-details.component";
import { TrelloService } from "../../../../core/api/trello.service";
import { STORE_KEYS } from "../../../../core/store/actions";
import { store } from "../../../..";
import { getStoreValue } from "../../../../core/store/util";
import htmlContent from "./card.component.html";

export class CardComponent extends BaseComponent {
  constructor({ container, props, }) {
    super({ container, htmlContent, });
    this.card = props.card;
    this.list = props.list;
    this.trelloService = new TrelloService();
    this.init();
    this.setSubscribers();
  }

  init() {
    this.cardNameElement = this.container.querySelector(".card-name");
    this.cardActivityNumberElement = this.container.querySelector('.card-activity-number');
    console.log(this.card)
    this.container.card = this.card;
    this.cardNameElement.innerText = this.card.name;
    this.container.addEventListener("click", async (e) => {
      const cardDetails = await this.trelloService.getBoardCard(this.card.id);
      const cardDetailsElement = new CardDetailsComponent({
        props: {
          card: cardDetails,
          list: this.list,
        },
      });
      ModalComponent.show({
        content: cardDetailsElement.container,
      });
    });
  }

  setSubscribers() {
    store.subscribe(() => {
      const activeCard = getStoreValue(STORE_KEYS.ACTIVE_CARD);
      if (activeCard.id === this.card.id) {
        this.card = activeCard;
        this.init();
      }
    });
  }
}
