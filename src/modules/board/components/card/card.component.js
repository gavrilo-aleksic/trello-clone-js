import { BaseComponent } from '../../../../core/components/base.component';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { CardDetailsComponent } from '../card-details/card-details.component';
import { TrelloService } from '../../../../core/api/trello.service';
import htmlContent from './card.component.html';

export class CardComponent extends BaseComponent {
    constructor({container, props}) {
        super({container, htmlContent});
        this.card = props.card;
        this.trelloService = new TrelloService();
        this.init()
    }
   init(){
       this.cardNameElement = this.container.querySelector('.card-name')
       this.cardNameElement.innerText = this.card.name;
       this.container.addEventListener('click', async (e) => {
           const cardDetails = await this.trelloService.getBoardCard(this.card.id);
           const cardDetailsElement = new CardDetailsComponent({props: {card: cardDetails}});
           ModalComponent.show({content: cardDetailsElement.container});
       })
   }
}