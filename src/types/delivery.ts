import {Response} from "./response";
import {ClientId} from "./common";

export type DeliveryService = {
    name: string;
    code: string;
    active: boolean;
};

export type ResponseDeliveryServices = Response & {
    deliveryServices: Record<string, DeliveryService>;
};

export type DeliveryType = {
    name: string;
    code: string;
    active: boolean;
    defaultCost: number;
    defaultNetCost: number;
    description: string;
    paymentTypes: string[];
    integrationCode: string;
    deliveryServices: string[];
    defaultForCrm: boolean;
    vatRate: string;
    defaultTariffCode: string;
    defaultTariffType: string;
    defaultTariffName: string;
};

export type ResponseDeliveryTypes = Response & {
    deliveryTypes: Record<string, DeliveryType>
};

/**
 *    Единица измерения товара
 */
type DeliveryCalculatePackageItemUnit = {
    /**
     * Символьный код
     */
    code: string;
    /**
     * Название
     */
    name: string;
    /**
     * Краткое обозначение
     */
    sym: string;
};
/**
 * Содержимое упаковки
 */
type DeliveryCalculatePackageItem = {
    /**
     *    Идентификатор оффера в системе
     */
    offerId: string;
    /**
     * Идентификатор торгового предложения в магазине
     */
    externalId: string;
    /**
     * Идентификатор торгового предложения в складской системе
     */
    xmlId: string;
    /**
     * Наименование товара
     */
    name: string;
    /**
     * Объявленная стоимость за единицу товара
     */
    declaredValue: number;
    /**
     * Наложенный платеж за единицу товара
     */
    cod: number;
    /**
     * Ставка НДС ("none" - НДС не облагается)
     */
    vatRate: string;
    /**
     * Количество товара в упаковке
     */
    quantity: number;
    /**
     * Единица измерения товара
     */
    unit: DeliveryCalculatePackageItemUnit;
    /**
     * Стоимость товара (с учетом скидок)
     */
    cost: number;
    /**
     * Коды маркировки
     */
    markingCodes: string[];
};
type DeliveryCalculatePackage = {
    /**
     * Вес г.
     */
    weight: number;
    /**
     * Идентификатор упаковки
     */
    packageId: string;
    /**
     * Ширина мм.
     */
    width: number;
    /**
     * Длина мм.
     */
    length: number;
    /**
     * Высота мм.
     */
    height: number;
    /**
     * Содержимое упаковки
     */
    items: DeliveryCalculatePackageItem;
};
export type DeliveryCalculate = {
    /**
     * Идентификатор клиента во внешнем сервисе
     */
    clientId: ClientId;
    /**
     * JSON с данными для расчета стоимости доставки
     */
    calculate: {
        /**
         * Набор упаковок
         */
        packages: DeliveryCalculatePackage[];
    };
};