import {Response} from "./response";

export type PaymentType = {
    name: string;
    code: string;
    active: boolean;
    defaultForCrm: boolean;
    defaultForApi: boolean;
    description: string;
    deliveryTypes: string[];
    paymentStatuses: string[];
    integrationModule?: {
        active: boolean;
        name: string;
        logo: string;
    }
};

export type ResponsePaymentTypes = Response & {
    paymentTypes: Record<string, PaymentType>
};

export type PaymentStatus = {
    name: string;
    code: string;
    active: boolean;
    defaultForCrm: boolean;
    defaultForApi: boolean;
    paymentComplete: boolean;
    ordering: number;
    description: string;
    paymentTypes: string[];
};

export type ResponsePaymentStatuses = Response & {
    paymentStatuses: Record<string, PaymentStatus>
};