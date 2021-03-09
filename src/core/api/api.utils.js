import { APP_LOCATIONS } from '../../config/constants';
import { AuthenticationComponent } from '../../modules/authentication/authenticate.component';
import { MainComponent } from '../../modules/main/main.component';

export const parseResponse = (responsePromise) =>
  new Promise((resolve, reject) => {
    responsePromise
      .then((response) => {
        if (response.status === 401) {
          alert('Invalid Token');
          MainComponent.setPage(AuthenticationComponent, APP_LOCATIONS.AUTH);
        }
        return response.json();
      })
      .then((r) => resolve(r))
      .catch((e) => reject(e));
  });
