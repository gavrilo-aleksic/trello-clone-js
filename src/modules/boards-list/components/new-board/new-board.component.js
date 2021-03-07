import { store } from "../../../../index";
import { TrelloService } from "../../../../core/api/trello.service";
import { BaseComponent } from "../../../../core/components/base.component";
import { ButtonComponent } from "../../../shared/button/button.component";
import { InputComponent } from "../../../shared/input/input.component";
import htmlContent from "./new-board.component.html";
import { ACTIONS } from "../../../../core/store/actions";
import { ModalComponent } from '../../../shared/modal/modal.component';

export class NewBoardComponent extends BaseComponent {
  constructor({ container, props, } = {}) {
    super({ container, htmlContent, });
    this.trelloService = new TrelloService();
    this.userFullName = props.userFullName;
    this.init();
  }

  async init() {
    this.boardNameElement = this.container.querySelector(".new-board-title");
    this.boardButtonElement = this.container.querySelector(".new-board-submit");
    new InputComponent({
      container: this.boardNameElement,
      props: {
        value: "Add board title",
        onValueChanged: (newValue) => (this.boardName = newValue),
      },
    });
    new ButtonComponent({
      container: this.boardButtonElement,
      props: {
        label: "Create Board",
        onClicked: (e) => {
          this.trelloService
            .createBoard(this.boardName)
            .then((createdBoard) => {
              store.dispatch({
                type: ACTIONS.CARD_CHANGED,
                data: createdBoard,
              });
              ModalComponent.close();
            });
        },
      },
    });
  }
}
