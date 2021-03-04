import { BaseComponent } from '../../core/components/base.component';
import htmlContent from './boards-list.component.html'

export class BoardsListComponent extends BaseComponent{
    constructor(container) {
        super(container, htmlContent)
    }
}