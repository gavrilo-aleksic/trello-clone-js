import {APP_CONSTANTS} from '../../config/constants';

const TRELLO_API_BASE_URL = 'https://api.trello.com/1';

export const TRELLO_ENDPOINTS = {
    getBoards: (username, token) => `${TRELLO_API_BASE_URL}/${username}/boards?key=${APP_CONSTANTS.TRELLO_API_KEY}&token=${token}`
}