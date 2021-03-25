import {Response} from "./response";

export type Store = {
    externalId: string;
    xmlId: string;
    description: string;
    email: string;
    code: string;
};

export type ResponseStores = Response & {
    stores: Record<string, Store>
};