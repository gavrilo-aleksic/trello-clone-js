import { ACTIONS, STORE_KEYS } from "./actions";
import { updateStore } from './util';

const initialState = {
  activeBoard: {},
  activeCard: {},
}
export const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.CARD_CHANGED:
      return updateStore(state, action, STORE_KEYS.ACTIVE_CARD );
    case ACTIONS.BOARD_CREATED:
      return updateStore(state, action, STORE_KEYS.ACTIVE_BOARD);
    case ACTIONS.CARD_CREATED:
      return updateStore(state, action, STORE_KEYS.NEW_CARD);
    case ACTIONS.USER_LOGIN:
      return updateStore(state, action, STORE_KEYS.USER_LOGIN);
    case ACTIONS.USER_LOGOUT:
      return updateStore(state, action, STORE_KEYS.USER_LOGOUT);
    default:
      return state;
  }
};
