export class BaseComponent{
    constructor({container, htmlContent, props}) {
        if(!container) {
            const wrapper = document.createElement('div');
            wrapper.innerHTML = htmlContent;
            this.container = wrapper.firstChild || wrapper;
        } else {
            this.container = container;
            this.container.innerHTML = htmlContent;
        }

    }
}