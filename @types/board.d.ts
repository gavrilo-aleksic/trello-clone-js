export interface IBoard {
    id: string;
    name: string;
    idOrganization: string;
    idMemberCreator: string;
    closed: boolean;
    url: string;
    prefs: {
        backgroundColor: string;
        backgroundImage: string;

    }
}