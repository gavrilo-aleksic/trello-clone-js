import {APP_CONSTANTS} from '../../config/constants';

const TRELLO_API_BASE_URL = 'https://api.trello.com/1';

export const TRELLO_ENDPOINTS = {
    authorize: () => `https://trello.com/1/authorize?expiration=1day&name=MyPersonalToken&scope=read&response_type=token&key=${APP_CONSTANTS.TRELLO_API_KEY}&return_url=http://localhost:9000`,
    getUserInfo: (token) => `https://api.trello.com/1/members/me?fields=username,id&key=${APP_CONSTANTS.TRELLO_API_KEY}&token=${token}`,
    getBoards: (username, token) => `${TRELLO_API_BASE_URL}/members/${username}/boards?key=${APP_CONSTANTS.TRELLO_API_KEY}&token=${token}`
}