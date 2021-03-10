import { APP_LOCATIONS } from '../config/constants';
import { AuthenticationComponent } from '../modules/authentication/authenticate.component';
import { MainComponent } from '../modules/main/main.component';


export const createQueryParams = (obj) => {
  const queryParams = new URLSearchParams(obj);
  queryParams.forEach((value, key) => {
    if (value === 'undefined') {
      queryParams.delete(key);
    }
  });
  return queryParams.toString();
};


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

