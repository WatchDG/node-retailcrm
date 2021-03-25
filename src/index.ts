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
        if (status < 200 || status >= 300) {
            if (!success) return ResultFail(new Error(`[${status}] ${errorMsg}`));
            return ResultFail(new Error(`[${status}]`));
        }
        return ResultOk(null);
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
     * Создание/редактирование службы доставки
     * @param {CreateDeliveryService} createDeliveryService - объект создания службы доставки
     */
    @tryCatchWrapperAsync
    async createDeliveryService(createDeliveryService: CreateDeliveryService): ReturningResultAsync<boolean, Error> {
        type rT = Response;
        const {code} = createDeliveryService;
        const {
            status,
            data
        } = (await this.instance.post<rT>(`/api/v5/reference/delivery-services/${code}/edit`)).unwrap();
        RetailCRM.checkResponse({status, data}).unwrap();
        return ResultOk(data.success);
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
     * Создание/редактирование типа доставки
     * @param {CreateDeliveryType} createDeliveryType - объект создания типа доставки
     */
    @tryCatchWrapperAsync
    async createDeliveryType(createDeliveryType: CreateDeliveryType): ReturningResultAsync<boolean, Error> {
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
        return ResultOk(data.success);
    }

    @tryCatchWrapperAsync
    async updateDeliveryType(code: DeliveryTypeCode, updateDeliveryType: UpdateDeliveryType): ReturningResultAsync<boolean, Error> {
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
        return ResultOk(data.success);
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
     * Получение списка складов
     */
    @tryCatchWrapperAsync
    async stores(): ReturningResultAsync<Store[], Error> {
        type rT = ResponseStores;
        const {status, data} = (await this.instance.get<rT>('/api/v5/reference/stores')).unwrap();
        RetailCRM.checkResponse({status, data}).unwrap();
        return ResultOk(RetailCRM.objectToArray(data.stores));
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
            headers,
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
    async getIntegrationModule(code: IntegrationModuleCode): ReturningResultAsync<IntegrationModule, Error> {
        type rT = ResponseIntegrationModule;
        const {status, data} = (await this.instance.get<rT>(`/api/v5/integration-modules/${code}`)).unwrap();
        RetailCRM.checkResponse({status, data}).unwrap();
        return ResultOk(data.integrationModule);
    }
}