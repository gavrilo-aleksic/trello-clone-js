import {APP_CONFIG} from '../../config/constants';

const TRELLO_API_BASE_URL = 'https://api.trello.com/1';
const API_KEY = APP_CONFIG.TRELLO_API_KEY;

export const TRELLO_ENDPOINTS = {
    authorize: () => `https://trello.com/1/authorize?expiration=1day&name=MyPersonalToken&scope=read&response_type=token&key=${API_KEY}&return_url=http://localhost:9000`,
    getUserInfo: (token) => `https://api.trello.com/1/members/me?fields=username,id&key=${API_KEY}&token=${token}`,
    getBoards: (username, token) => `${TRELLO_API_BASE_URL}/members/${username}/boards?lists=open&key=${API_KEY}&token=${token}`,
    getBoardCards: (boardId, token) => `https://api.trello.com/1/boards/${boardId}/cards?key=${API_KEY}&token=${token}`,
    getBoardCard: (cardId, token) => `https://api.trello.com/1/cards/${cardId}?members=true&key=${API_KEY}&token=${token}`

}