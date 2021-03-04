import htmlContent from './footer.component.html';
import { BaseComponent } from '../../core/components/base.component';
export class FooterComponent extends BaseComponent {
    constructor(container) {
        super(container, htmlContent)
    }
}