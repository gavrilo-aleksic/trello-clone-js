import { TrelloService } from '../../core/api/trello.service';
import { BaseComponent } from '../../core/components/base.component';
import htmlContent from './boards-list.component.html'

export class BoardsListComponent extends BaseComponent{
    constructor(container) {
        super(container, htmlContent);
        this.init();
    }

    async init() {
        this.boardsListContainer = document.querySelector(".boards-list");
        this.fetchBoards();

    }
    async fetchBoards() {
        this.trelloService = new TrelloService();
        this.boards = await this.trelloService.getBoards();
        for(let board of this.boards) {
            const boardTile = this.createBoardTile(board);
            this.boardsListContainer.appendChild(boardTile)
        }
    }

    createBoardTile(board) {
        const { backgroundColor, backgroundImage } = board.prefs;
        const boardTile = document.createElement('div');
        boardTile.innerHTML = board.name;
        boardTile.classList.add('board-tile');
        if(backgroundColor) {
            boardTile.style.backgroundColor = backgroundColor;
        } else if(backgroundImage) {
            boardTile.style.backgroundImage = `url(${backgroundImage})`;
        }

        return boardTile;
    }
}