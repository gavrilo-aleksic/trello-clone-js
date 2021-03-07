import { BaseComponent } from "../../core/components/base.component";
import { AuthenticationService } from "../../core/services/authentication.service";
import { ButtonComponent } from "../shared/button/button.component";
import htmlContent from "./header.component.html";

export class HeaderComponent extends BaseComponent {
  constructor({ container, }) {
    super({ container, htmlContent, });
    this.authenticationService = new AuthenticationService();
    this.init();
  }

  init() {
    const logoutWrapper = document.querySelector(".logout-button");
    this.logoutButton = new ButtonComponent({
      container: logoutWrapper,
      props: {
        label: "logout",
        onClick: () => this.logout(),
      },
    });
  }

  logout() {
    this.authenticationService.logout();
  }
}
