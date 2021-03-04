export class BaseComponent {
    constructor(container, htmlContent) {
        this.container = container;
        this.container.innerHTML = htmlContent;
    }
}