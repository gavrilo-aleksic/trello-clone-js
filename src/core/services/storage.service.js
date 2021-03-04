export const STORAGE_KEYS = {
    USER: 'user'
}

export class StorageService {
  get(key) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      return localStorage.getItem(key);
    }
  }

  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
