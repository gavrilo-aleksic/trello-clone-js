import { TrelloService } from '../../../../core/api/trello.service';
import { BaseComponent } from '../../../../core/components/base.component';
import { CardLabelComponent } from '../card-label/card-label.component';
import htmlContent from './card-details.component.html';

export class CardDetailsComponent extends BaseComponent {
    constructor({container, props}) {
        super({container, htmlContent});
        this.trelloService = new TrelloService();
        this.card = props.card
        this.init()
    }

    init(){
        this.cardTitleElement = this.container.querySelector('.card-details-title');
        this.cardDetailsMemebersElement = this.container.querySelector('.card-details-members');
        this.cardDetailsLabelsElement = this.container.querySelector('.card-details-labels');
        this.cardDetailsDescriptionElement = this.container.querySelector('.card-details-description');
        this.cardDetailsActivityElement = this.container.querySelector('.card-details-activity');
        this.setCardContent();
    }
    
    setCardContent() {
        this.cardTitleElement.innerHTML = this.card.name;
        this.cardDetailsDescriptionElement.innerHTML = this.card.desc;
        this.setMembers();
        this.setLabels();
    }

    setMembers() {
        for(let member of this.card.members) {
            const memberAvatarElement = document.createElement('img');
            memberAvatarElement.classList.add('card-details-members-avatar');
            memberAvatarElement.src = this.trelloService.generateAvatarUrl(member.avatarUrl);
            this.cardDetailsMemebersElement.appendChild(memberAvatarElement);
        }
    }

    setLabels() {
        for(let label of this.card.labels) {
            const labelElement = new CardLabelComponent({props: {text: label.name, color: label.color}});
            this.cardDetailsLabelsElement.appendChild(labelElement.container);
        }
    }
}