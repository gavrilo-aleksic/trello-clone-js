import htmlContent from './header.component.html';
import { BaseComponent } from '../../../../core/components/base.component';
export class HeaderComponent extends BaseComponent {
    constructor(container) {
        super(container, htmlContent)
    }
}