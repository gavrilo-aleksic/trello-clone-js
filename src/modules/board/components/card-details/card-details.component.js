import { TrelloService } from "../../../../core/api/trello.service";
import { BaseComponent } from "../../../../core/components/base.component";
import { CardLabelComponent } from "../card-label/card-label.component";
import { InputComponent } from "../../../shared/input/input.component";
import { CardModel } from "../../models/card.model";
import { store } from "../../../..";
import { ACTIONS } from "../../../../core/store/actions";
import htmlContent from "./card-details.component.html";
import { FloatingListComponent } from '../../../shared/floating-list/floating-list.component';

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
    this.cardDetailsListElement = this.container.querySelector(
      ".card-details-list-title"
    );
    this.setCardContent();
  }

  setCardContent() {
    this.setTitle();
    this.setList();
    this.setDescription();
    this.setMembers();
    this.setLabels();
    this.setActivities();
  }

  setTitle() {
    this.cardTitle = new InputComponent({
      container: this.cardTitleElement,
      props: {
        value: this.card.name,
        onValueChanged: (newValue) => {
          this.updateCard('name', newValue);
        },
      },
    });
  }

  setList() {
    this.cardDetailsListElement.innerHTML = `in list ${this.card.idList}`
  }

  setDescription() {
    const cardDetailsDescription = new InputComponent({
      container: this.cardDetailsDescriptionElement,
      props: {
        value: this.card.desc,
        multiLine: true,
        onValueChanged: (newValue) => {
          this.updateCard('desc', newValue);
        },
      },
    })
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
    const addMemberButton = document.createElement("div");
    addMemberButton.classList.add("card-details-members-avatar", 'list-opener');
    addMemberButton.innerHTML = '+';
    addMemberButton.addEventListener('click', () => {
      const newMemberList = new FloatingListComponent({});
    });
    this.cardDetailsMemebersElement.appendChild(addMemberButton);
  }

  setLabels() {
    for (let label of this.card.labels) {
      const labelElement = new CardLabelComponent({
        props: { text: label.name, color: label.color, },
      });
      this.cardDetailsLabelsElement.appendChild(labelElement.container);
    }
  }

  setActivities() {
    for (let activity of this.card.actions) {
      const commentWrapper = document.createElement("div");
      commentWrapper.innerHTML = `
         <div class="card-details-activity-member-wrapper">
          <img class="card-details-activity-member-avatar" src=${this.trelloService.generateAvatarUrl(
            activity.memberCreator.avatarUrl
          )}>
          <span class="card-details-activity-member-name">${
            activity.memberCreator.fullName || activity.memberCreator.id
          }</span>
         </div>
         <div class="card-details-activity-comment">${activity.data.text}</div>
      `;
      this.cardDetailsActivityElement.appendChild(commentWrapper);
    }
  }

  updateCard(fieldName, newValue) {
    if (this.card. id) {
      this.trelloService
        .updateCard(this.card.id, {[fieldName]: newValue, })
        .then((r) => {
          this.card[fieldName] = newValue;
          store.dispatch({ type: ACTIONS.CARD_CHANGED, data: this.card, });
        });
    } else {
      this.trelloService
        .createCard({idList: this.card.idList, [fieldName]: newValue, })
        .then((r) => {
          this.card[fieldName] = newValue;
          store.dispatch({ type: ACTIONS.CARD_CREATED, data: r, });
        });
    }
  }
}
