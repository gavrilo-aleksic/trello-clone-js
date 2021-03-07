import htmlContent from "./main.component.html";
import { BaseComponent } from "../../core/components/base.component";
import { BoardsListComponent } from "../boards-list/boards-list.component";
import { AuthenticationService } from "../../core/services/authentication.service";
import { AuthenticationComponent } from "../authentication/authenticate.component";
import  RouterService  from '../../core/services/router.service';
import { APP_LOCATIONS } from '../../config/constants';

export class MainComponent extends BaseComponent {
  constructor({container, }) {
    super({container, htmlContent, });
    this.authenticationService = new AuthenticationService();
    this.init();
  }

  async init() {
    MainComponent.mainWrapper = document.querySelector(".main-wrapper");
    const user = await this.authenticationService.getUser();
    if (user) {
      MainComponent.setPage(BoardsListComponent, APP_LOCATIONS.BOARDS);
    } else {
      MainComponent.setPage(AuthenticationComponent, APP_LOCATIONS.AUTH);
    }
  }

  static setPage(PageComponent, hash, props = {}) {
    new PageComponent({container: MainComponent.mainWrapper, props, });
    RouterService.setRoute(hash);
  }
}
