export class BaseComponent{
  constructor({container, htmlContent, cssClass, props, }) {
    if (!container) {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = htmlContent;
      this.container = wrapper.firstChild || wrapper;
    } else {
      this.container = container;
      this.container.innerHTML = htmlContent;
    }
    if (cssClass) {
      this.container.classList.add(cssClass);
    }
    this.htmlContent = htmlContent;
  }

  reset() {
    this.container.innerHTML = this.htmlContent;
    this.init();
  }

  init(){
    
  }
}
