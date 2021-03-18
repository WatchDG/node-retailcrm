import {Response} from "./response";

export type ApiVersion = string;

export type ResponseApiVersions = Response & {
    versions: ApiVersion[]
};

export type SiteAccess = 'access_full' | 'access_selective';

export type Credentials = {
    credentials: string[],
    siteAccess: SiteAccess;
    sitesAvailable: string[];
};

export type ResponseCredentials = Response & Credentials;

export type CountryCode = string;

export type ResponseCountryCodes = Response & {
    countriesIso: Record<string, CountryCode>;
};

/**
 * @alias ClientId
 */
export type ClientId = string;