import { StorageService, STORAGE_KEYS } from "../services/storage.service";
import { TRELLO_ENDPOINTS } from "./api-endpoints";
import { parseResponse } from "./api.utils";

export class TrelloService {
  constructor() {
    this.storageService = new StorageService();
    this.init();
  }

  init() {
    const user = this.storageService.get(STORAGE_KEYS.USER);
    if (user) {
      this.token = user.token;
      this.username = user.username;
    }
  }

  authorize() {
    window.location.href = TRELLO_ENDPOINTS.authorize();
  }

  getUserInfo(token = this.token) {
    return parseResponse(fetch(TRELLO_ENDPOINTS.getUserInfo(token)));
  }

  getBoards() {
    return parseResponse(
      fetch(TRELLO_ENDPOINTS.getBoards(this.username, this.token))
    );
  }

  getBoardCards(boardId) {
    return parseResponse(
      fetch(TRELLO_ENDPOINTS.getBoardCards(boardId, this.token))
    );
  }

  getBoardCard(cardId) {
    return parseResponse(
      fetch(TRELLO_ENDPOINTS.getBoardCard(cardId, this.token))
    );
  }

  generateAvatarUrl(url, size = 30) {
    return `${url}/${size}.png`;
  }

  updateCardField(cardId, fieldName, value) {
    return parseResponse(
      fetch(TRELLO_ENDPOINTS.updateCardField(cardId, fieldName, value, this.token), {
        method: "PUT",
      })
    );
  }
}
