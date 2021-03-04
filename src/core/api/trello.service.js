import { TRELLO_ENDPOINTS } from './api-endpoints';

export class TrelloService {
    constructor(username, token){
        this.username = username;
        this.token = token;
    }
    
    getBoards() {
        fetch(TRELLO_ENDPOINTS.getBoards(this.username, this.token)).then(res => {
            console.log(res);
        })
    }
}
