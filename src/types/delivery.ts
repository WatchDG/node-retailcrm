import {Response} from "./response";

export type DeliveryService = {
    name: string;
    code: string;
    active: boolean;
};

export type ResponseDeliveryServices = Response & {
    deliveryServices: Record<string, DeliveryService>;
};

export type DeliveryType = {
    name: string;
    code: string;
    active: boolean;
    defaultCost: number;
    defaultNetCost: number;
    description: string;
    paymentTypes: string[];
    integrationCode: string;
    deliveryServices: string[];
    defaultForCrm: boolean;
    vatRate: string;
    defaultTariffCode: string;
    defaultTariffType: string;
    defaultTariffName: string;
};

export type ResponseDeliveryTypes = Response & {
    deliveryTypes: Record<string, DeliveryType>
};