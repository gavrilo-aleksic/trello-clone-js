import htmlContent from "./main.component.html";
import { BaseComponent } from "../../core/components/base.component";
import { BoardsListComponent } from "../boards-list/boards-list.component";
import { AuthenticationService } from "../../core/services/authentication.service";
import { AuthenticationComponent } from "../authentication/authenticate.component";

export class MainComponent extends BaseComponent {
  constructor(container) {
    super(container, htmlContent);
    this.init();
  }

  async init() {
    const authenticationService = new AuthenticationService();
    const mainWrapper = document.querySelector("#main-wrapper");
    const user = await authenticationService.getUser();
    if (user) {
        const boardsList = new BoardsListComponent(mainWrapper);
    } else {
      new AuthenticationComponent(mainWrapper);
    }
  }
}
