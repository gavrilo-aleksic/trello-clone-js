import { BaseComponent } from '../../../core/components/base.component';
import htmlContent from "./button.component.html";

export class ButtonComponent extends BaseComponent{
    constructor(container, props) {
        super(container,htmlContent);
        this.init(props);
    }

    init(props) {
        const {label, onClick} = props;
        this.container.addEventListener('click', (e) => {
            onClick(e);
        });
        this.container.querySelector(".button-text").innerHTML = label;
    }
}