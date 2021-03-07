import { COLORS } from "../../../config/colors";
import { BaseComponent } from "../../../core/components/base.component";
import htmlContent from "./button.component.html";

export class ButtonComponent extends BaseComponent {
  constructor({ container, props, }) {
    super({ container, htmlContent, });
    this.onClick = props.onClick || (() => {});
    this.label = props.label || "";
    this.color = props.color || COLORS.GRAY;
    this.init(props);
  }

  init() {
    this.setType();
    this.setEvents();
    this.setText();
  }

  setType() {
    this.container.style.backgroundColor = this.color;
  }

  setEvents() {
    this.container.addEventListener("click", (e) => {
      this.onClick(e);
    });
  }

  setText(text = this.label) {
    this.buttonTextElement = this.container.querySelector(".button-text");
    this.buttonTextElement.innerHTML = text;
  }
}
