import {HttpInstance} from "http-instance";
import {
    ResultFail,
    ResultOk,
    ReturningResult,
    ReturningResultAsync,
    tryCatchWrapper,
    tryCatchWrapperAsync
} from "node-result";
import {ApiVersions, Credentials, ResponseApiVersions, ResponseCredentials} from "./types/response";

type RetailCRMOptions = {
    baseUrl: string;
    apiKey: string;
}

export default class RetailCRM {
    private readonly instance: HttpInstance;

    constructor(options: RetailCRMOptions) {
        this.instance = new HttpInstance({
            baseUrl: options.baseUrl,
            headers: {
                'X-API-KEY': options.apiKey
            }
        })
    }

    @tryCatchWrapper
    private static checkResponse(response: { status: number, data: { success: boolean } }): ReturningResult<null, Error> {
        const {status, data} = response;
        if (status !== 200) return ResultFail(new Error(`status code not success: ${status}`));
        if (!data.success) return ResultFail(new Error(`[${status}] ${JSON.stringify(data)}`));
        return ResultOk(null);
    }

    @tryCatchWrapperAsync
    async apiVersions(): ReturningResultAsync<ApiVersions, Error> {
        type rT = ResponseApiVersions;
        const {status, data} = (await this.instance.get<rT>('/api/api-versions')).unwrap();
        RetailCRM.checkResponse({status, data}).unwrap();
        return ResultOk(data);
    }

    @tryCatchWrapperAsync
    async credentials(): ReturningResultAsync<Credentials, Error> {
        type rT = ResponseCredentials;
        const {status, data} = (await this.instance.get<rT>(' /api/credentials ')).unwrap();
        RetailCRM.checkResponse({status, data}).unwrap();
        return ResultOk(data);
    }
}