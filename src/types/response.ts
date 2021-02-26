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
    statuses: object[]
};
export type ResponseOrderStatusGroups = Response & {
    statusGroups: OrderStatusGroup[]
};