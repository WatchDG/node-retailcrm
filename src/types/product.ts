import {Response} from "./response";

export type ProductStatus = {
    code: string;
    ordering: number;
    active: boolean;
    createdAt: string;
    orderStatusByProductStatus: string;
    orderStatusForProductStatus: string;
    cancelStatus: boolean;
    name: string;
};

export type ResponseProductStatuses = Response & {
    productStatuses: Record<string, ProductStatus>
};