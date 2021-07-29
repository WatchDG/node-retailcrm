type CreateOrderItemProperty = {
    code: string;
    name: string;
    value: string;
};

type CreateOrderItemExternalId = {
    code: string;
    value: string;
};

type CreateOrderItem = {
    markingCodes: string[];
    id: number;
    initialPrice: number;
    discountManualAmount: number;
    discountManualPercent: number;
    vatRate: string;
    createdAt: string;
    quantity: number;
    comment: string;
    properties: CreateOrderItemProperty[];
    purchasePrice: number;
    offer: {
        id: number;
        externalId: string;
        xmlId: string;
    };
    productName: string;
    status: string;
    priceType: {
        code: string;
    };
    externalId: string;
    externalIds: CreateOrderItemExternalId[];
};

type CreateOrderPayment = {
    externalId: string;
    amount: number;
    paidAt: string;
    comment: string;
    type: string;
    status: string;
};

// individual - физическое лицо
type ContragentIndividual = {
    contragentType: 'individual';
};

// legal-entity - юридическое лицо
type ContragentLegalEntity = {
    contragentType: 'legal-entity';
    legalName: string;
    legalAddress: string;
    INN: string;
    OKPO: string;
    KPP: string;
    OGRN: string;
    BIK: string;
    bank: string;
    bankAddress: string;
    corrAccount: string;
    bankAccount: string;
};

// enterpreneur - индивидуальный предприниматель
type ContragentEnterpreneur = {
    contragentType: 'enterpreneur';
    legalName: string;
    legalAddress: string;
    INN: string;
    OKPO: string;
    OGRNIP: string;
    certificateNumber: string;
    certificateDate: string;
    BIK: string;
    bank: string;
    bankAddress: string;
    corrAccount: string;
    bankAccount: string;
};

type Contragent = ContragentIndividual | ContragentLegalEntity | ContragentEnterpreneur;

export type CreateOrder = {
    site: string;
    order: {
        number: string;
        externalId: string;
        privilegeType: 'none' | 'personal_discount' | 'loyalty_level' | 'loyalty_event';
        countryIso: string;
        // Если не задать createdAt, то будет использовано текущее время в качестве даты/времени оформления заказа.
        createdAt?: string;
        statusUpdatedAt: string;
        discountManualAmount: number;
        discountManualPercent: number;
        mark: number;
        markDatetime: string;
        lastName: string;
        firstName: string;
        patronymic: string;
        phone: string;
        additionalPhone: string;
        email: string;
        call: boolean;
        expired: boolean;
        customerComment: string;
        managerComment: string;
        contragent: Contragent;
        statusComment: string;
        weight: number;
        length: number;
        width: number;
        height: number;
        shipmentDate: string;
        shipped: boolean;
        // dialogId
        customFields: Record<string, unknown>[];
        orderType: string;
        orderMethod: string;
        // Если не задать customer, то клиент будет автоматически создан на основе данных из заказа.
        customer?: {
            id: number;
            externalId: string;
            browserId: string;
            site: string;
            type: string;
            nickName: string;
        };
        contact: {
            id: number;
            externalId: string;
            browserId: string;
            site: string;
        };
        company: {
            id: number;
            externalId: string;
        };
        managerId: number;
        status: string;
        items: CreateOrderItem[];
        source: {
            source: string;
            medium: string;
            campaign: string;
            keyword: string;
            content: string;
        };
        shipmentStore: string;
        payments: CreateOrderPayment[];
        loyaltyEventId: number;
        delivery: Record<string, unknown>;
    };
}