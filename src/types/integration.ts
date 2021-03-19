import {Response} from "./response";

/**
 * Символьный код модуля (должен совпадать с кодом модуля, заданным через партнерский кабинет)
 */
export type IntegrationModuleIntegrationCode = string;

/**
 * Символьный код экземпляра модуля
 */
export type IntegrationModuleCode = string;

type CreateIntegrationModuleIntegrationsDeliveryStatus = {
    code: string;
    name: string;
    isEditable: boolean;
};

type CreateIntegrationModuleIntegrationsDeliveryPlate = {
    type: string;
    code: string;
    label: string;
};

type CreateIntegrationModuleIntegrationsDeliveryDeliveryDataFieldChoice = {
    value: string;
    label: string;
};

type CreateIntegrationModuleIntegrationsDeliveryDeliveryDataField = {
    code: string;
    label: string;
    hint: string;
    type: string;
    multiple: boolean;
    choices: CreateIntegrationModuleIntegrationsDeliveryDeliveryDataFieldChoice[];
    autocompleteUrl: string;
    visible: boolean;
    required: boolean;
    affectsCost: boolean;
    editable: boolean;
};

type CreateIntegrationModuleIntegrationsDeliveryShipmentDataFieldChoice = {
    value: string;
    label: string;
};

type CreateIntegrationModuleIntegrationsDeliveryShipmentDataField = {
    code: string;
    label: string;
    hint: string;
    type: string;
    multiple: boolean;
    choices: CreateIntegrationModuleIntegrationsDeliveryShipmentDataFieldChoice[];
    autocompleteUrl: string;
    visible: boolean;
    required: boolean;
    affectsCost: boolean;
    editable: boolean;
};

type CreateIntegrationModuleIntegrationsDeliverySettings = {
    defaultPayerType: string;
    costCalculateBy: string;
    nullDeclaredValue: boolean;
    lockedByDefault: boolean;
    paymentTypes: { code: string; active: boolean; cod: boolean }[];
    shipmentPoints: { code: string; shipmentPointId: number; shipmentPointLabel: string }[];
    statuses: { code: string; trackingStatusCode: string }[];
    deliveryExtraData: Record<string, string>;
    shipmentExtraData: Record<string, string>;
};

type CreateIntegrationModuleIntegrationsDelivery = {
    description: string;
    actions: Record<'calculate' | 'shipmentPointList' | string, string>;
    payerType: string[];
    platePrintLimit: number;
    rateDeliveryCost: boolean;
    allowPackages: boolean;
    codAvailable: boolean;
    selfShipmentAvailable: boolean;
    duplicateOrderProductSupported: boolean;
    allowTrackNumber: boolean;
    availableCountries: string[];
    requiredFields: string[];
    statusList: CreateIntegrationModuleIntegrationsDeliveryStatus[];
    plateList: CreateIntegrationModuleIntegrationsDeliveryPlate[];
    deliveryDataFieldList: Partial<CreateIntegrationModuleIntegrationsDeliveryDeliveryDataField>[];
    shipmentDataFieldList: Partial<CreateIntegrationModuleIntegrationsDeliveryShipmentDataField>[];
    settings: Partial<CreateIntegrationModuleIntegrationsDeliverySettings>;
};

export type CreateIntegrationModule = {
    code: IntegrationModuleCode;
    integrationCode: IntegrationModuleIntegrationCode;
    active: boolean;
    name: string;
    logo: string;
    clientId: string;
    baseUrl: string;
    actions: Record<string, string>;
    availableCountries: string[];
    accountUrl: string;
    integrations: {
        delivery?: Partial<CreateIntegrationModuleIntegrationsDelivery>
    };
};

export type IntegrationModule = {
    code: IntegrationModuleCode;
    integrationCode: IntegrationModuleIntegrationCode;
    active: boolean;
    freeze: boolean;
    native: boolean;
    baseUrl: string;
    actions: Record<string, string>;
    availableCountries: string[];
    accountUrl?: string;
};

export type ResponseIntegrationModule = {
    integrationModule: IntegrationModule
} & Response;