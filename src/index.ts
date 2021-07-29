import {HttpInstance} from "http-instance";
import {URLSearchParams} from 'url';

import {fail, ok, tryCatch, tryCatchAsync} from "node-result";
import type {TResult, TResultAsync} from "node-result";

import {
    Info,
    OrderStatus, OrderStatusGroup, OrderType, Response, ResponseInfo, ResponseOrderStatuses,
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
import {
    ResponseDeliveryServices,
    DeliveryService,
    CreateDeliveryService,
    DeliveryServiceCode
} from "./types/delivery_service";
import {PaymentStatus, PaymentType, ResponsePaymentStatuses, ResponsePaymentTypes} from './types/payment';
import {ProductStatus, ResponseProductStatuses} from "./types/product";
import {
    CreateIntegrationModule,
    IntegrationModule,
    IntegrationModuleCode,
    ResponseIntegrationModule
} from './types/integration';
import {
    CreateDeliveryType,
    DeliveryType,
    DeliveryTypeCode,
    ResponseDeliveryTypes,
    UpdateDeliveryType
} from "./types/delivery-type";
import {ResponseStores, Store} from "./types/store";
import type {CreateOrder} from "./types/order";

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

    @tryCatch
    private static checkResponse(response: { status: number, data: { success: boolean, errorMsg?: string, errors?: Record<string, unknown> } }): TResult<null, Error> {
        const {status, data: {success, errorMsg, errors}} = response;
        if (status < 200 || status >= 300) {
            if (!success) return fail(new Error(`[${status}] ${errorMsg} | ${JSON.stringify(errors)}`));
            return fail(new Error(`[${status}]`));
        }
        return ok(null);
    }

    /**
     * Convert object to array.
     * @param {object} object - object
     * @return {array} - array
     * @private
     */
    private static objectToArray<T>(object: Record<string, T>): T[] {
        const array = [];
        Object.keys(object).forEach(key => array.push(object[key]));
        return array;
    }

    /**
     * Получение списка доступных версий API.
     */
    @tryCatchAsync
    async apiVersions(): TResultAsync<ApiVersion[], Error> {
        type rT = ResponseApiVersions;
        const {status, data} = (await this.instance.get<rT>('/api/api-versions')).unwrap();
        RetailCRM.checkResponse({status, data}).unwrap();
        return ok(data.versions);
    }

    /**
     * Получение списка доступных методов и магазинов для данного ключа.
     */
    @tryCatchAsync
    async credentials(): TResultAsync<Credentials, Error> {
        type rT = ResponseCredentials;
        const {status, data} = (await this.instance.get<rT>('/api/credentials')).unwrap();
        RetailCRM.checkResponse({status, data}).unwrap();
        return ok(data);
    }

    /**
     * Получение списка магазинов.
     */
    @tryCatchAsync
    async sites(): TResultAsync<Site[], Error> {
        type rT = ResponseSites;
        const {status, data} = (await this.instance.get<rT>('/api/v5/reference/sites')).unwrap();
        RetailCRM.checkResponse({status, data}).unwrap();
        return ok(RetailCRM.objectToArray(data.sites));
    }

    /**
     * Получение списка единиц измерений.
     * @return TResultAsync<Unit[], Error>>
     */
    @tryCatchAsync
    async units(): TResultAsync<Unit[], Error> {
        type rT = ResponseUnits;
        const {status, data} = (await this.instance.get<rT>('/api/v5/reference/units')).unwrap();
        RetailCRM.checkResponse({status, data}).unwrap();
        return ok(RetailCRM.objectToArray(data.units));
    }

    /**
     * Получение списка кодов доступных стран.
     */
    @tryCatchAsync
    async countryCodes(): TResultAsync<CountryCode[], Error> {
        type rT = ResponseCountryCodes;
        const {status, data} = (await this.instance.get<rT>('/api/v5/reference/countries')).unwrap();
        RetailCRM.checkResponse({status, data}).unwrap();
        return ok(RetailCRM.objectToArray(data.countriesIso));
    }

    /**
     * Получение списка групп статусов заказа.
     */
    @tryCatchAsync
    async orderStatusGroups(): TResultAsync<OrderStatusGroup[], Error> {
        type rT = ResponseOrderStatusGroups;
        const {status, data} = (await this.instance.get<rT>('/api/v5/reference/status-groups')).unwrap();
        RetailCRM.checkResponse({status, data}).unwrap();
        return ok(RetailCRM.objectToArray(data.statusGroups));
    }

    /**
     * Получение списка статусов заказа.
     */
    @tryCatchAsync
    async orderStatuses(): TResultAsync<OrderStatus[], Error> {
        type rT = ResponseOrderStatuses;
        const {status, data} = (await this.instance.get<rT>('/api/v5/reference/statuses')).unwrap();
        RetailCRM.checkResponse({status, data}).unwrap();
        return ok(RetailCRM.objectToArray(data.statuses));
    }

    /**
     * Получение списка типов заказов.
     */
    @tryCatchAsync
    async orderTypes(): TResultAsync<OrderType[], Error> {
        type rT = ResponseOrderTypes;
        const {status, data} = (await this.instance.get<rT>('/api/v5/reference/order-types')).unwrap();
        RetailCRM.checkResponse({status, data}).unwrap();
        return ok(RetailCRM.objectToArray(data.orderTypes));
    }

    /**
     * Получение списка типов оплаты.
     */
    @tryCatchAsync
    async paymentTypes(): TResultAsync<PaymentType[], Error> {
        type rT = ResponsePaymentTypes;
        const {status, data} = (await this.instance.get<rT>('/api/v5/reference/payment-types')).unwrap();
        RetailCRM.checkResponse({status, data}).unwrap();
        return ok(RetailCRM.objectToArray(data.paymentTypes));
    }

    /**
     * Получение списка статусов оплаты.
     */
    @tryCatchAsync
    async paymentStatuses(): TResultAsync<PaymentStatus[], Error> {
        type rT = ResponsePaymentStatuses;
        const {status, data} = (await this.instance.get<rT>('/api/v5/reference/payment-statuses')).unwrap();
        RetailCRM.checkResponse({status, data}).unwrap();
        return ok(RetailCRM.objectToArray(data.paymentStatuses));
    }

    /**
     * Получение списка служб доставки.
     */
    @tryCatchAsync
    async deliveryServices(): TResultAsync<DeliveryService[], Error> {
        type rT = ResponseDeliveryServices;
        const {status, data} = (await this.instance.get<rT>('/api/v5/reference/delivery-services')).unwrap();
        RetailCRM.checkResponse({status, data}).unwrap();
        return ok(RetailCRM.objectToArray(data.deliveryServices));
    }

    /**
     * Создание/редактирование службы доставки
     * @param {CreateDeliveryService} createDeliveryService - объект создания службы доставки
     */
    @tryCatchAsync
    async createDeliveryService(createDeliveryService: CreateDeliveryService): TResultAsync<boolean, Error> {
        type rT = Response;
        const {code} = createDeliveryService;
        const {
            status,
            data
        } = (await this.instance.post<rT>(`/api/v5/reference/delivery-services/${code}/edit`)).unwrap();
        RetailCRM.checkResponse({status, data}).unwrap();
        return ok(data.success);
    }

    /**
     * Получение списка типов доставки.
     */
    @tryCatchAsync
    async deliveryTypes(): TResultAsync<DeliveryType[], Error> {
        type rT = ResponseDeliveryTypes;
        const {status, data} = (await this.instance.get<rT>('/api/v5/reference/delivery-types')).unwrap();
        RetailCRM.checkResponse({status, data}).unwrap();
        return ok(RetailCRM.objectToArray(data.deliveryTypes));
    }

    /**
     * Создание/редактирование типа доставки
     * @param {CreateDeliveryType} createDeliveryType - объект создания типа доставки
     */
    @tryCatchAsync
    async createDeliveryType(createDeliveryType: CreateDeliveryType): TResultAsync<boolean, Error> {
        type rT = Response;
        const {code} = createDeliveryType;
        const payload = new URLSearchParams();
        payload.append("deliveryType", JSON.stringify(createDeliveryType));
        const {
            status,
            data
        } = (await this.instance.post<rT>(`/api/v5/reference/delivery-types/${code}/edit`, payload.toString(), {
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        })).unwrap();
        RetailCRM.checkResponse({status, data}).unwrap();
        return ok(data.success);
    }

    @tryCatchAsync
    async updateDeliveryType(code: DeliveryTypeCode, updateDeliveryType: UpdateDeliveryType): TResultAsync<boolean, Error> {
        type rT = Response;
        const payload = new URLSearchParams();
        payload.append("deliveryType", JSON.stringify(updateDeliveryType));
        const {
            status,
            data
        } = (await this.instance.post<rT>(`/api/v5/reference/delivery-types/${code}/edit`, payload.toString(), {
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        })).unwrap();
        RetailCRM.checkResponse({status, data}).unwrap();
        return ok(data.success);
    }

    /**
     * Получение списка статусов товаров в заказе.
     */
    @tryCatchAsync
    async productStatuses(): TResultAsync<ProductStatus[], Error> {
        type rT = ResponseProductStatuses;
        const {status, data} = (await this.instance.get<rT>('/api/v5/reference/product-statuses')).unwrap();
        RetailCRM.checkResponse({status, data}).unwrap();
        return ok(RetailCRM.objectToArray(data.productStatuses));
    }

    /**
     * Получение списка складов
     */
    @tryCatchAsync
    async stores(): TResultAsync<Store[], Error> {
        type rT = ResponseStores;
        const {status, data} = (await this.instance.get<rT>('/api/v5/reference/stores')).unwrap();
        RetailCRM.checkResponse({status, data}).unwrap();
        return ok(RetailCRM.objectToArray(data.stores));
    }

    /**
     * Создание/редактирование интеграционного модуля.
     * @param {IntegrationModuleCode} code
     * @param {CreateIntegrationModule} createIntegrationModule
     */
    @tryCatchAsync
    async createIntegrationModule(code: IntegrationModuleCode, createIntegrationModule: Partial<CreateIntegrationModule>): TResultAsync<Info[], Error> {
        type rT = ResponseInfo;
        const payload = new URLSearchParams();
        payload.append("integrationModule", JSON.stringify(createIntegrationModule));
        const {
            status,
            headers,
            data
        } = (await this.instance.post<rT>(`/api/v5/integration-modules/${code}/edit`, payload.toString(), {
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        })).unwrap();
        RetailCRM.checkResponse({status, data}).unwrap();
        return ok(data.info);
    }

    /**
     * Получение интеграционного модуля
     * @param code
     */
    @tryCatchAsync
    async getIntegrationModule(code: IntegrationModuleCode): TResultAsync<IntegrationModule, Error> {
        type rT = ResponseIntegrationModule;
        const {status, data} = (await this.instance.get<rT>(`/api/v5/integration-modules/${code}`)).unwrap();
        RetailCRM.checkResponse({status, data}).unwrap();
        return ok(data.integrationModule);
    }

    @tryCatchAsync
    async getOrder(orderId: string, site?: string, by: 'externalId' | 'id' = 'externalId'): TResultAsync<Record<string, any>, Error> {
        type rT = Record<string, any> & Response;
        let params = `?by=${by}`;
        if (site) params += `&site=${site}`;
        const {status, data} = (await this.instance.get<rT>(`/api/v5/orders/${orderId}${params}`)).unwrap();
        RetailCRM.checkResponse({status, data}).unwrap();
        return ok(data.order);
    }

    @tryCatchAsync
    async createOrder(createOrder: CreateOrder): TResultAsync<Record<string, any>, Error> {
        type rT = Record<string, any> & Response;
        const payload = new URLSearchParams();
        payload.append("site", createOrder.site);
        payload.append("order", JSON.stringify(createOrder.order));
        const {status, data} = (await this.instance.post<rT>(` /api/v5/orders/create`, payload.toString(), {
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        })).unwrap();
        RetailCRM.checkResponse({status, data}).unwrap();
        return ok(data.order);
    }
}