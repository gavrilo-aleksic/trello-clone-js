import { BaseComponent } from "../../../core/components/base.component";
import htmlContent from "./floating-list.component.html";

export class FloatingListComponent extends BaseComponent {
  constructor({ container, props = {}, }) {
    super({ container, htmlContent, });
    this.title = props.title || "";
    this.elements = props.elements;
    this.name = new Date().getTime();
    this.init();
  }

  init() {
    this.closeHandlerClone = this.closeHandler.bind(this);
    document.addEventListener("click", this.closeHandlerClone);
    document.body.appendChild(this.container);
  }

  closeHandler (e) {
    if (
      !e.target.classList.contains('list-opener') &&  (e.target !== this.container &&
      !e.target.closest(".floating-list-wrapper"))
    ) {
      this.hide();
    }
  }

  hide() {
    document.removeEventListener("click", this.closeHandlerClone);
    document.body.removeChild(this.container);
  }
}
