import { BaseComponent } from '../../../core/components/base.component';
import htmlContent from "./input.component.html";

export class InputComponent extends BaseComponent {
  constructor({container, props}) {
    super({container, htmlContent});
    this.value = props.value || '';
    this.onValueChanged = props.onValueChanged || (() => {});
    this.init();
  }

  init() {

    this.input = this.container.querySelector('.input-text');
    this.setValue();
    this.setEvents();
  }

  setEvents(el) {
    console.log(this.input);
    this.input.addEventListener('change', (e) => {
      console.log(this.input.value);
    })
  }

  setValue(value = this.value) {
    this.input.value = value;
  }

  getValue(){
    return this.input.value
  }
}
