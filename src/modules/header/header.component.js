import { BaseComponent } from '../../core/components/base.component';
import htmlContent from './header.component.html';

export class HeaderComponent extends BaseComponent {
    constructor(container) {
        super(container, htmlContent)
    }
}