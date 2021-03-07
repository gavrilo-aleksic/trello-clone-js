import { ACTIONS, STORE_KEYS } from "./actions";
import { updateStore } from './util';

export const counterReducer = (state = {}, action) => {
  switch (action.type) {
    case ACTIONS.CARD_CHANGED:
      return updateStore(state, { [STORE_KEYS.ACTIVE_CARD]: action.data, });
    case ACTIONS.BOARD_CREATED:
      return updateStore(state, {[STORE_KEYS.ACTIVE_BOARD]: action.data, })
  }
};
