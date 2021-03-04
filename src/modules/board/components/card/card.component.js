import { BaseComponent } from '../../../../core/components/base.component';
import htmlContent from './card.component.html';

export class CardComponent extends BaseComponent {
    constructor({container, props}) {
        super({container, htmlContent});
        this.card = props.card
        this.init()
    }
   init(){
       this.cardNameElement = this.container.querySelector('.card-name')
       this.cardNameElement.innerText = this.card.name
   }
}