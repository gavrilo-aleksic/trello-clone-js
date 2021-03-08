import { createQueryParams } from '../../utils/request.util';
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

  createBoard(boardName) {
    return parseResponse(
      fetch(TRELLO_ENDPOINTS.createBoard(boardName, this.token), {
        method: "POST",
      })
    );
  }

  updateCard(cardId, body) {
    const query = createQueryParams(body);
    return parseResponse(
      fetch(TRELLO_ENDPOINTS.updateCard(cardId, query, this.token), {
        method: "PUT",
      })
    );
  }

  createCard(listId, body) {
    const query = createQueryParams(body);
    return parseResponse(
      fetch(TRELLO_ENDPOINTS.createCard(listId, query, this.token), {
        method: "POST",
      })
    );    
  }
}
