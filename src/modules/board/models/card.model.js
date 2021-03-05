export class CardModel {
    constructor(args = {}) {
        this.id = args.id;
        this.name = args.name || '' ;
        this.desc = args.desc || '';
        this.closed = args.closed || false;
        this.idMembers = args.idMembers || [];
        this.members = args.members || [];
        this.idBoard = args.idBoard;
        this.labels = args.labels || [];
    }
}