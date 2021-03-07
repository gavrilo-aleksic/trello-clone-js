import htmlContent from "./modal.component.html";

export class ModalComponent {
  init() {
    this.wrapper = document.querySelector(".modal-wrapper");
  }

  static show({ content, onClose = () => {} }) {
    let modalContent;
    this.onClose = onClose;
    if (!ModalComponent.modalWrapper) {
      const modalWrapper = document.createElement("div");
      document.body.appendChild(modalWrapper);
      modalWrapper.innerHTML = htmlContent;
      ModalComponent.modalWrapper = modalWrapper.querySelector(
        ".modal-wrapper"
      );
      ModalComponent.modalWrapper.addEventListener("click", (e) => {
        if (e.target === ModalComponent.modalWrapper) {
          ModalComponent.close({onClose: this.onClose});
        }
      });
      ModalComponent.modalWrapper.querySelector('.modal-close').addEventListener('click',()=>{
        ModalComponent.close({onClose: this.onClose});
      })
    }
    modalContent = ModalComponent.modalWrapper.querySelector(".modal-content");
    modalContent.innerHTML = '';
    modalContent.appendChild(content);
    ModalComponent.modalWrapper.classList.add("is-open");
  }

  static close({onClose = () => {}}) {
    const modalContent = ModalComponent.modalWrapper.querySelector(".modal-content");
    modalContent.innerHTML = '';
    ModalComponent.modalWrapper.classList.remove("is-open");
    onClose();
  }
}
