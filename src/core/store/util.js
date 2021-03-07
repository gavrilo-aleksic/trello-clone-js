import { store } from '../..';

export const updateStore = (oldState, newValues) => Object.assign({}, oldState, newValues);

export const getStoreValue = (key) => store.getState()[key]