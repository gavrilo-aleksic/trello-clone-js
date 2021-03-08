export interface IBoardCard {
    id: string;
    name: string;
    closed: boolean;
    desc: string;
    idMembers: string[];
    pos: number;
    members: {
        fullName: string;id: string;
        avatarUrl: string;
    }[];
    idBoard: string;
    labels: {
        color: string;
        id: string;
        idBoard: string;
        name: string;
    }[];
    actions: {
        date: Date;
        type: 'commentCard',
        data: {
            text: string;
        }
    }[]
}