import {HttpInstance} from "http-instance";
import {
    ResultFail,
    ResultOk,
    ReturningResult,
    ReturningResultAsync,
    tryCatchWrapper,
    tryCatchWrapperAsync
} from "node-result";
import {
    ApiVersions,
    Credentials, OrderStatus, OrderStatusGroup, OrderType, PaymentType,
    ResponseApiVersions,
    ResponseCredentials, ResponseOrderStatuses,
    ResponseOrderStatusGroups, ResponseOrderTypes, ResponsePaymentTypes, ResponseSites, ResponseUnits, Site, Unit
} from "./types/response";

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

    private static objectToArray<T>(object: Record<string, T>): T[] {
        const array = [];
        Object.keys(object).forEach(key => array.push(object[key]));
        return array;
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
        const {status, data} = (await this.instance.get<rT>('/api/credentials')).unwrap();
        RetailCRM.checkResponse({status, data}).unwrap();
        return ResultOk(data);
    }

    /**
     * Получение списка групп статусов заказа.
     */
    @tryCatchWrapperAsync
    async orderStatusGroups(): ReturningResultAsync<OrderStatusGroup[], Error> {
        type rT = ResponseOrderStatusGroups;
        const {status, data} = (await this.instance.get<rT>('/api/v5/reference/status-groups')).unwrap();
        RetailCRM.checkResponse({status, data}).unwrap();
        return ResultOk(RetailCRM.objectToArray(data.statusGroups));
    }

    /**
     * Получение списка статусов заказа.
     */
    @tryCatchWrapperAsync
    async orderStatuses(): ReturningResultAsync<OrderStatus[], Error> {
        type rT = ResponseOrderStatuses;
        const {status, data} = (await this.instance.get<rT>('/api/v5/reference/statuses')).unwrap();
        RetailCRM.checkResponse({status, data}).unwrap();
        return ResultOk(RetailCRM.objectToArray(data.statuses));
    }

    /**
     * Получение списка единиц измерений.
     */
    @tryCatchWrapperAsync
    async units(): ReturningResultAsync<Unit[], Error> {
        type rT = ResponseUnits;
        const {status, data} = (await this.instance.get<rT>('/api/v5/reference/units')).unwrap();
        RetailCRM.checkResponse({status, data}).unwrap();
        return ResultOk(RetailCRM.objectToArray(data.units));
    }

    /**
     * Получение списка магазинов.
     */
    @tryCatchWrapperAsync
    async sites(): ReturningResultAsync<Site[], Error> {
        type rT = ResponseSites;
        const {status, data} = (await this.instance.get<rT>('/api/v5/reference/sites')).unwrap();
        RetailCRM.checkResponse({status, data}).unwrap();
        return ResultOk(RetailCRM.objectToArray(data.sites));
    }

    /**
     * Получение списка типов заказов.
     */
    @tryCatchWrapperAsync
    async orderTypes(): ReturningResultAsync<OrderType[], Error> {
        type rT = ResponseOrderTypes;
        const {status, data} = (await this.instance.get<rT>('/api/v5/reference/order-types')).unwrap();
        RetailCRM.checkResponse({status, data}).unwrap();
        return ResultOk(RetailCRM.objectToArray(data.orderTypes));
    }

    /**
     * Получение списка типов оплаты.
     */
    @tryCatchWrapperAsync
    async paymentTypes(): ReturningResultAsync<PaymentType[], Error> {
        type rT = ResponsePaymentTypes;
        const {status, data} = (await this.instance.get<rT>('/api/v5/reference/payment-types')).unwrap();
        RetailCRM.checkResponse({status, data}).unwrap();
        return ResultOk(RetailCRM.objectToArray(data.paymentTypes));
    }
}