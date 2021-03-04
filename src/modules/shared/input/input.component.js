import { BaseComponent } from '../../../core/components/base.component';
import htmlContent from "./input.component.html";

export class InputComponent extends BaseComponent {
  constructor({container}) {
    super({container, htmlContent});
    this.init();
  }

  init() {
    this.input = this.container.querySelector('.input');
  }

  getValue(){
    return this.input.value
  }
}
