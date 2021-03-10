import { COLORS } from '../../config/colors';
import { APP_LOCATIONS } from "../../config/constants";
import { BaseComponent } from "../../core/components/base.component";
import { AuthenticationService } from "../../core/services/authentication.service";
import { AuthenticationComponent } from "../authentication/authenticate.component";
import { MainComponent } from "../main/main.component";
import { ButtonComponent } from "../shared/button/button.component";
import htmlContent from "./header.component.html";

export class HeaderComponent extends BaseComponent {
  constructor({ container, }) {
    super({ container, htmlContent, });
    this.authenticationService = new AuthenticationService();
    this.setSubscribers();
    this.init();
  }

  init() {
    const logoutWrapper = document.querySelector(".logout-button");
    this.logoutButton = new ButtonComponent({
      props: {
        color: COLORS.SKY,
        label: "Logout",
        onClicked: () => this.logout(),
      },
    });
    logoutWrapper.appendChild(this.logoutButton.container);
  }

  setSubscribers() {}

  logout() {
    this.authenticationService.logout();
    MainComponent.setPage(AuthenticationComponent, APP_LOCATIONS.AUTH);
  }
}
