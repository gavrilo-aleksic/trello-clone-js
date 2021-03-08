import { store } from "../..";

export const updateStore = (oldState, action, key) =>
  Object.assign({}, oldState, {
    [key]: action.data,
    ACTION: action.type,
  });

export const getStoreValue = (key) => store.getState()[key];

export const getLastAction = () => store.getState().ACTION;
