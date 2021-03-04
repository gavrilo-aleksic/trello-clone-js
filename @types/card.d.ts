export interface IBoardCard {
    id: string;
    name: string;
    closed: boolean;
    desc: string;
    labels: {
        color: string;
        id: string;
        idBoard: string;
        name: string;
    }[]
}