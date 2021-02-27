type IntegrationModuleCode = string;
type IntegrationModuleIntegrationCode = string;

type CreateIntegrationModule = {
    code: IntegrationModuleCode;
    integrationCode: IntegrationModuleIntegrationCode;
    active: boolean;
    name: string;
    logo: string;
    clientId: string;
    baseUrl: string;
    actions: string[];
    availableCountries: string[];
    accountUrl: string;
    integrations: {};
};