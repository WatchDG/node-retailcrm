import {HttpInstance} from "http-instance";
import {URLSearchParams} from 'url';

import {
    ResultFail,
    ResultOk,
    ReturningResult,
    ReturningResultAsync,
    tryCatchWrapper,
    tryCatchWrapperAsync
} from "node-result";

import {
    Info,
    OrderStatus, OrderStatusGroup, OrderType, ResponseInfo, ResponseOrderStatuses,
    ResponseOrderStatusGroups, ResponseOrderTypes, ResponseSites, ResponseUnits, Site, Unit
} from "./types/response";

import {
    ApiVersion,
    ResponseApiVersions,
    Credentials,
    ResponseCredentials,
    CountryCode,
    ResponseCountryCodes
} from "./types/common";
import {DeliveryService, DeliveryType, ResponseDeliveryServices, ResponseDeliveryTypes} from './types/delivery'
import {PaymentStatus, PaymentType, ResponsePaymentStatuses, ResponsePaymentTypes} from './types/payment';
import {ProductStatus, ResponseProductStatuses} from "./types/product";
import {CreateIntegrationModule, IntegrationModuleCode} from './types/integration';

/**
 * @alias Options
 */
type Options = {
    /**
     * base url
     */
    baseUrl: string;
    /**
     * api key
     */
    apiKey: string;
}

/**
 * class RetailCRM
 */
export class RetailCRM {
    private readonly instance: HttpInstance;

    /**
     * class constructor
     * @param {Options} options - options
     */
    constructor(options: Options) {
        this.instance = new HttpInstance({
            baseUrl: options.baseUrl,
            headers: {
                'X-API-KEY': options.apiKey
            }
        })
    }

    @tryCatchWrapper
    private static checkResponse(response: { status: number, data: { success: boolean, errorMsg?: string } }): ReturningResult<null, Error> {
        const {status, data: {success, errorMsg}} = response;
        if (status !== 200) {
            if (!success) return ResultFail(new Error(`[${status}] ${errorMsg}`));
            return ResultFail(new Error(`[${status}]`));
        }
        return ResultOk(null);
    }

    private static objectToArray<T>(object: Record<string, T>): T[] {
        const array = [];
        Object.keys(object).forEach(key => array.push(object[key]));
        return array;
    }

    /**
     * Получение списка доступных версий API.
     */
    @tryCatchWrapperAsync
    async apiVersions(): ReturningResultAsync<ApiVersion[], Error> {
        type rT = ResponseApiVersions;
        const {status, data} = (await this.instance.get<rT>('/api/api-versions')).unwrap();
        RetailCRM.checkResponse({status, data}).unwrap();
        return ResultOk(data.versions);
    }

    /**
     * Получение списка доступных методов и магазинов для данного ключа.
     */
    @tryCatchWrapperAsync
    async credentials(): ReturningResultAsync<Credentials, Error> {
        type rT = ResponseCredentials;
        const {status, data} = (await this.instance.get<rT>('/api/credentials')).unwrap();
        RetailCRM.checkResponse({status, data}).unwrap();
        return ResultOk(data);
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
     * Получение списка единиц измерений.
     * @return ReturningResultAsync<Unit[], Error>>
     */
    @tryCatchWrapperAsync
    async units(): ReturningResultAsync<Unit[], Error> {
        type rT = ResponseUnits;
        const {status, data} = (await this.instance.get<rT>('/api/v5/reference/units')).unwrap();
        RetailCRM.checkResponse({status, data}).unwrap();
        return ResultOk(RetailCRM.objectToArray(data.units));
    }

    /**
     * Получение списка кодов доступных стран.
     */
    @tryCatchWrapperAsync
    async countryCodes(): ReturningResultAsync<CountryCode[], Error> {
        type rT = ResponseCountryCodes;
        const {status, data} = (await this.instance.get<rT>('/api/v5/reference/countries')).unwrap();
        RetailCRM.checkResponse({status, data}).unwrap();
        return ResultOk(RetailCRM.objectToArray(data.countriesIso));
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

    /**
     * Получение списка статусов оплаты.
     */
    @tryCatchWrapperAsync
    async paymentStatuses(): ReturningResultAsync<PaymentStatus[], Error> {
        type rT = ResponsePaymentStatuses;
        const {status, data} = (await this.instance.get<rT>('/api/v5/reference/payment-statuses')).unwrap();
        RetailCRM.checkResponse({status, data}).unwrap();
        return ResultOk(RetailCRM.objectToArray(data.paymentStatuses));
    }

    /**
     * Получение списка служб доставки.
     */
    @tryCatchWrapperAsync
    async deliveryServices(): ReturningResultAsync<DeliveryService[], Error> {
        type rT = ResponseDeliveryServices;
        const {status, data} = (await this.instance.get<rT>('/api/v5/reference/delivery-services')).unwrap();
        RetailCRM.checkResponse({status, data}).unwrap();
        return ResultOk(RetailCRM.objectToArray(data.deliveryServices));
    }

    /**
     * Получение списка типов доставки.
     */
    @tryCatchWrapperAsync
    async deliveryTypes(): ReturningResultAsync<DeliveryType[], Error> {
        type rT = ResponseDeliveryTypes;
        const {status, data} = (await this.instance.get<rT>('/api/v5/reference/delivery-types')).unwrap();
        RetailCRM.checkResponse({status, data}).unwrap();
        return ResultOk(RetailCRM.objectToArray(data.deliveryTypes));
    }

    /**
     * Получение списка статусов товаров в заказе.
     */
    @tryCatchWrapperAsync
    async productStatuses(): ReturningResultAsync<ProductStatus[], Error> {
        type rT = ResponseProductStatuses;
        const {status, data} = (await this.instance.get<rT>('/api/v5/reference/product-statuses')).unwrap();
        RetailCRM.checkResponse({status, data}).unwrap();
        return ResultOk(RetailCRM.objectToArray(data.productStatuses));
    }

    /**
     * Создание/редактирование интеграционного модуля.
     * @param {IntegrationModuleCode} code
     * @param {CreateIntegrationModule} createIntegrationModule
     */
    @tryCatchWrapperAsync
    async createIntegrationModule(code: IntegrationModuleCode, createIntegrationModule: Partial<CreateIntegrationModule>): ReturningResultAsync<Info[], Error> {
        type rT = ResponseInfo;
        const payload = new URLSearchParams();
        payload.append("integrationModule", JSON.stringify(createIntegrationModule));
        const {
            status,
            data
        } = (await this.instance.post<rT>(`/api/v5/integration-modules/${code}/edit`, payload.toString(), {
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        })).unwrap();
        RetailCRM.checkResponse({status, data}).unwrap();
        return ResultOk(data.info);
    }

    /**
     * Получение интеграционного модуля
     * @param code
     */
    @tryCatchWrapperAsync
    async getIntegrationModule(code: IntegrationModuleCode): ReturningResultAsync<Record<string, any>, Error> {
        type rT = any;
        const {status, data} = (await this.instance.get<rT>(`/api/v5/integration-modules/${code}`)).unwrap();
        RetailCRM.checkResponse({status, data}).unwrap();
        return ResultOk(data.integrationModule);
    }
}