import htmlContent from "./modal.component.html";

export class ModalComponent {
  init() {
    this.wrapper = document.querySelector(".modal-wrapper");
  }

  static show({ content, onClose = () => {}, closeOnOutsideClick = true, }) {
    let modalContent;
    this.onClose = onClose;
    this.closeOnOutsideClick = closeOnOutsideClick;
    if (!ModalComponent.modalWrapper) {
      const modalWrapper = document.createElement("div");
      document.body.appendChild(modalWrapper);
      modalWrapper.innerHTML = htmlContent;
      ModalComponent.modalWrapper = modalWrapper.querySelector(
        ".modal-wrapper"
      );
      ModalComponent.modalWrapper.addEventListener("click", (e) => {
        if (e.target === ModalComponent.modalWrapper && this.closeOnOutsideClick) {
          ModalComponent.close({onClose: this.onClose, button: false, });
        }
      });
      ModalComponent.modalWrapper.querySelector('.modal-close').addEventListener('click', () => {
        ModalComponent.close({onClose: this.onClose, button: true, });
      })
    }
    modalContent = ModalComponent.modalWrapper.querySelector(".modal-content");
    modalContent.innerHTML = '';
    modalContent.appendChild(content);
    ModalComponent.modalWrapper.classList.add("is-open");
  }

  static close({onClose = () => {}, button = false, } = {} ) {
    const modalContent = ModalComponent.modalWrapper.querySelector(".modal-content");
    modalContent.innerHTML = '';
    ModalComponent.modalWrapper.classList.remove("is-open");
    onClose(button);
  }
}
