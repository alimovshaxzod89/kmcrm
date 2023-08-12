import {ICustomer} from "./Customer.type";

export interface IDemand {
    id: number,
    doc_no: string,

    customer_id: string | number,
    Customer: ICustomer,
}
