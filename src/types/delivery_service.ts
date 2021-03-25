import {Response} from "./response";

/**
 * Символьный код.
 */
export type DeliveryServiceCode = string;

/**
 * Название.
 */
type DeliveryServiceName = string;

/**
 * Тип доставки.
 */
type DeliveryServiceDeliveryType = string;

/**
 * Статус активности.
 */
type DeliveryServiceActive = boolean;

/**
 * Служба доставки.
 */
export type DeliveryService = {

    /**
     * Название.
     */
    name: DeliveryServiceName;

    /**
     * Символьный код.
     */
    code: DeliveryServiceCode;

    /**
     * Статус активности.
     */
    active: DeliveryServiceActive;

};

/**
 * Ответ API по списку служб доставок.
 */
export type ResponseDeliveryServices = Response & {

    deliveryServices: Record<string, DeliveryService>;

};

/**
 * Объект создания службы доставки.
 */
export type CreateDeliveryService = {

    /**
     * Символьный код.
     */
    code: DeliveryServiceCode;

    /**
     * Название.
     */
    name: DeliveryServiceName;

    /**
     * Тип доставки.
     */
    deliveryType: DeliveryServiceDeliveryType;

    /**
     * Статус активности.
     */
    active: DeliveryServiceActive;

};