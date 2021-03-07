import { TrelloService } from "../../../../core/api/trello.service";
import { BaseComponent } from "../../../../core/components/base.component";
import { CardLabelComponent } from "../card-label/card-label.component";
import { InputComponent } from "../../../shared/input/input.component";
import { CardModel } from "../../models/card.model";
import { store } from '../../../..';
import { ACTIONS } from '../../../../core/store/actions';
import htmlContent from "./card-details.component.html";

export class CardDetailsComponent extends BaseComponent {
  constructor({ container, props, }) {
    super({ container, htmlContent, });
    this.trelloService = new TrelloService();
    this.card = new CardModel(props.card);
    this.init();
  }

  init() {
    this.cardTitleElement = this.container.querySelector(".card-details-title");
    this.cardDetailsMemebersElement = this.container.querySelector(
      ".card-details-members"
    );
    this.cardDetailsLabelsElement = this.container.querySelector(
      ".card-details-labels"
    );
    this.cardDetailsDescriptionElement = this.container.querySelector(
      ".card-details-description"
    );
    this.cardDetailsActivityElement = this.container.querySelector(
      ".card-details-activity"
    );
    this.setCardContent();
  }

  setCardContent() {
    this.setDescription();
    this.setTitle();
    this.setMembers();
    this.setLabels();
  }

  setTitle() {
    this.cardTitle = new InputComponent({
      container: this.cardTitleElement,
      props: {
        value: this.card.name,
        onValueChanged: (newValue, oldValue) => {
          this.trelloService.updateCardName(this.card.id, newValue).then(r => {
            this.card.name = r.name;
            store.dispatch({ type: ACTIONS.CARD_CHANGED, data: this.card, });
          })
        },
      },
    });
  }

  setDescription() {
    this.cardDetailsDescriptionElement.innerHTML = this.card.desc;
  }

  setMembers() {
    for (let member of this.card.members) {
      const memberAvatarElement = document.createElement("img");
      memberAvatarElement.classList.add("card-details-members-avatar");
      memberAvatarElement.src = this.trelloService.generateAvatarUrl(
        member.avatarUrl
      );
      this.cardDetailsMemebersElement.appendChild(memberAvatarElement);
    }
  }

  setLabels() {
    for (let label of this.card.labels) {
      const labelElement = new CardLabelComponent({
        props: { text: label.name, color: label.color, },
      });
      this.cardDetailsLabelsElement.appendChild(labelElement.container);
    }
  }
}
