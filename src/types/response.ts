export type Response = {
    success: boolean;
};

export type ApiVersions = {
    versions: string[];
};

export type ResponseApiVersions = Response & ApiVersions;

export type SiteAccess = 'access_full' | 'access_selective';

export type Credentials = {
    credentials: string[],
    siteAccess: SiteAccess;
    sitesAvailable: string[];
};

export type ResponseCredentials = Response & Credentials;

export type OrderStatusGroup = {
    name: string;
    code: string;
    active: boolean;
    ordering: number;
    process: boolean;
    statuses: string[]
};
export type ResponseOrderStatusGroups = Response & {
    statusGroups: Record<string, OrderStatusGroup>
};

export type OrderStatus = {
    name: string;
    code: string;
    active: boolean;
    ordering: number;
    group: string;
};
export type ResponseOrderStatuses = Response & {
    statuses: Record<string, OrderStatus>;
};


export type Unit = {
    code: string;
    name: string;
    sym: string;
    default: boolean;
    active: boolean;
};

export type ResponseUnits = Response & {
    units: Record<string, Unit>
};

export type Site = {
    name: string;
    url: string;
    code: string;
    description: string;
    phones: string;
    address: string;
    zip: string;
    defaultForCrm: boolean;
    ymlUrl: string;
    loadFromYml: boolean;
    catalogUpdatedAt: string;
    catalogLoadingAt: string;
    contragent: object;
    countryIso: string;
};

export type ResponseSites = Response & {
    sites: Record<string, Site>
};