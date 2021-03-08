import { store } from '../../index';
import { TrelloService } from '../../core/api/trello.service';
import { BaseComponent } from '../../core/components/base.component';
import { AuthenticationService } from '../../core/services/authentication.service';
import { ACTIONS, STORE_KEYS } from '../../core/store/actions';
import { BoardComponent } from '../board/board.component';
import { MainComponent } from '../main/main.component';
import { ModalComponent } from '../shared/modal/modal.component';
import { NewBoardComponent } from './components/new-board/new-board.component';
import { getLastAction, getStoreValue } from '../../core/store/util';
import htmlContent from './boards-list.component.html'

export class BoardsListComponent extends BaseComponent{
  constructor({container, }) {
    super({container, htmlContent, });
    this.authenticationService = new AuthenticationService();
    this.setSubscribers();
    this.init();
  }

  async init() {
    this.boardsListContainer = document.querySelector(".boards-list");
    this.fetchBoards();
  }

  async fetchBoards() {
    this.trelloService = new TrelloService();
    this.boards = await this.trelloService.getBoards();
    for (let board of this.boards) {
      const boardTile = this.createBoardTile(board);
      this.boardsListContainer.appendChild(boardTile)
    }
    const boardTile = this.createBoardTile({
      name: 'Create new board',
      prefs: {
        backgroundColor: 'rgba(9,30,66,.04)',
      },
    });
    this.boardsListContainer.appendChild(boardTile)
  }

  createBoardTile(board) {
    const { backgroundColor, backgroundImage, } = board.prefs;
    const boardTile = document.createElement('div');
    boardTile.innerHTML = board.name;
    boardTile.classList.add('board-tile');
    if (backgroundColor) {
      boardTile.style.backgroundColor = backgroundColor;
    } else if (backgroundImage) {
      boardTile.style.backgroundImage = `url(${backgroundImage})`;
    }
    boardTile.addEventListener('click', async () => {
      if (board.id) {
        MainComponent.setPage(BoardComponent, `boards/${board.id}`, {board, });
      } else {
        ModalComponent.show({
          content: new NewBoardComponent({
            props: {
              userFullName: (await this.authenticationService.getUser()).fullName,
            },
          }).container,
          closeOnOutsideClick: false,
        })
      }
    })

    return boardTile;
  }

  
  setSubscribers() {
    store.subscribe(() => {
      if (getLastAction() === ACTIONS.BOARD_CREATED) {
        this.reset();
      }
    });
  }
}
