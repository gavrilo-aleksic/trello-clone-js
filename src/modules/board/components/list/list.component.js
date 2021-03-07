import { BaseComponent } from '../../../../core/components/base.component';
import { store } from '../../../../core/store/reducer';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { CardModel } from '../../models/card.model';
import { CardDetailsComponent } from '../card-details/card-details.component';
import { CardComponent } from '../card/card.component';
import htmlContent from './list.component.html';

export class ListComponent extends BaseComponent {
    constructor({container, props}) {
        super({container, htmlContent});
        this.list = props.list
        this.cards = props.cards
        this.init();
    }
    init(){
        this.nameElement = this.container.querySelector('.list-name')
        this.nameElement.innerText = this.list.name
        this.listContent = this.container.querySelector('.list-content')
        this.cards.forEach(card=>{
            const cardElement = new CardComponent({props:{card}})
            this.listContent.appendChild(cardElement.container)
        });
        this.createNewCardButton = this.container.querySelector('.list-new-card');
        this.createNewCardButton.addEventListener('click', () => {
            const newCardElement = new CardDetailsComponent({props: {card: new CardModel({
                desc: 'Description',
                name: 'Title'
            })}});
            ModalComponent.show({content: newCardElement.container});
        })
    }    
}