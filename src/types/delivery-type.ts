import {Response} from "./response";

/**
 * Динамический тип расчета стоимости доставки.
 */
type DeliveryTypeIsDynamicCostCalculation = boolean;

/**
 * Стоимости доставки расчитывается автоматически службой доставки.
 */
type DeliveryTypeIsAutoCostCalculation = boolean;

/**
 * Себестоимости доставки расчитывается автоматически службой доставки.
 */
type DeliveryTypeIsAutoNetCostCalculation = boolean;

/**
 * Стоимость доставки зависит от региона, веса и суммы заказа.
 */
type DeliveryTypeIsCostDependsOnRegionAndWeightAndSum = boolean;

/**
 * Стоимость доставки зависит от времени и дня недели
 */
type DeliveryTypeIsCostDependsOnDateTime = boolean;

/**
 * Название
 */
type DeliveryTypeName = string;

/**
 * Символьный код
 */
export type DeliveryTypeCode = string;

/**
 * Тип доставки.
 */
export type DeliveryType = {

    /**
     * Динамический тип расчета стоимости доставки.
     */
    isDynamicCostCalculation: DeliveryTypeIsDynamicCostCalculation;

    /**
     * Стоимости доставки расчитывается автоматически службой доставки.
     */
    isAutoCostCalculation: DeliveryTypeIsAutoCostCalculation;

    /**
     * Себестоимости доставки расчитывается автоматически службой доставки
     */
    isAutoNetCostCalculation: DeliveryTypeIsAutoNetCostCalculation;

    /**
     * Стоимость доставки зависит от региона, веса и суммы заказа
     */
    isCostDependsOnRegionAndWeightAndSum: DeliveryTypeIsCostDependsOnRegionAndWeightAndSum;

    /**
     * Стоимость доставки зависит от времени и дня недели
     */
    isCostDependsOnDateTime: DeliveryTypeIsCostDependsOnDateTime;

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
 * Объект создания типа доставки.
 */
export type CreateDeliveryType = {
    /**
     * Название
     */
    name: DeliveryTypeName;

    /**
     * Символьный код
     */
    code: DeliveryTypeCode;

    defaultCost: number;
    defaultNetCost: number;
    integrationModule?: string;
    regionWeightCostConditions?: string;
    vatRate?: string;
    defaultTariffCode?: string;
    defaultTariffType?: string;
    defaultTariffName?: string;
    active?: boolean;
    description?: string;
    defaultForCrm?: boolean;
    integrationCode?: string;
    paymentTypes?: string[];
    deliveryServices?: string[];
};

/**
 * Объект обновления типа доставки.
 */
export type UpdateDeliveryType = {
    /**
     * Название
     */
    name: DeliveryTypeName;
    defaultCost?: number;
    defaultNetCost?: number;
    integrationModule?: string;
    regionWeightCostConditions?: string;
    vatRate?: string;
    defaultTariffCode?: string;
    defaultTariffType?: string;
    defaultTariffName?: string;
    active?: boolean;
    description?: string;
    defaultForCrm?: boolean;
    integrationCode?: string;
    paymentTypes?: string[];
    deliveryServices?: string[];
};