import htmlContent from './main.component.html';
import { BaseComponent } from '../../core/components/base.component';
export class MainComponent extends BaseComponent {
    constructor(container) {
        super(container, htmlContent)
    }
}