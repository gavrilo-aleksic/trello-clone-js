import {IList} from './list';
export interface IBoard {
    id: string;
    name: string;
    idOrganization: string;
    idMemberCreator: string;
    closed: boolean;
    url: string;
    lists: IList[];
    prefs: {
        backgroundColor: string;
        backgroundImage: string;
    }
}