import { BaseComponent } from '../../../core/components/base.component';
import htmlContent from "./input.component.html";

export class InputComponent extends BaseComponent {
  constructor({container, props, }) {
    super({container, htmlContent, });
    this.value = props.value || '';
    this.multiLine = props.multiLine || false;
    this.onValueChanged = props.onValueChanged || (() => {});
    this.onInput = props.onInput || (() => {});
    this.placeholder = props.placeholder || '';
    this.init();
  }

  init() {
    this.input = this.container.querySelector('.input-text');
    this.input.placeholder = this.placeholder;
    if (!this.multiLine) {
      this.input.addEventListener('input', (e) => {
        this.input.value = this.input.value.replace(/\n/g, '');
      });
    } else {
      this.input.classList.add('input-text-multiline')
    }
    
    this.setValue();
    this.setEvents();

  }

  setEvents(el) {
    this.input.addEventListener('change', (e) => {
      this.onValueChanged(this.input.value, this.value);
      this.value = this.input.value;
    });
    this.input.addEventListener('input', (e) => {
      this.onInput(e.data, this.value + e.data, this.value);
    })
  }

  setValue(value = this.value) {
    this.input.value = value;
    this.value = value;
  }

  getValue(){
    return this.input.value
  }
}
