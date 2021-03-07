export class CardModel {
  constructor(args = {}) {
    this.id = args.id;
    this.idBoard = args.idBoard;
    this.idList = args.idList;
    this.name = args.name || '' ;
    this.desc = args.desc || '';
    this.closed = args.closed || false;
    this.idMembers = args.idMembers || [];
    this.members = args.members || [];
    this.labels = args.labels || [];
    this.actions = args.actions ? args.actions.filter((action) => action.type === 'commentCard') : [];
  }
}
