import { BaseComponent } from '../../../core/components/base.component';
import htmlContent from "./button.component.html";

export class ButtonComponent extends BaseComponent{
    constructor({container, props}) {
        super({container,htmlContent});
        this.onClick = props.onClick || (() => {});
        this.label = props.label || '';
        this.init(props);
    }

    init() {
        this.container.addEventListener('click', (e) => {
            this.onClick(e);
        });
        this.container.querySelector(".button-text").innerHTML = this.label;
    }
}