// "id": 96207,
//     "production_id": 1616,
//     "unit_step_id": 1303,
//     "duration": 31122,
//     "cost": 12843,
//     "start_at": "2023-01-02T22:51:57.000000Z",
//     "started_at": "2022-11-25T10:58:41.000000Z",
//     "finish_at": "2023-05-13T07:01:44.000000Z",
//     "finished_at": null,
//     "sorder": 1,
//     "amount": 3,
//     "paid": false,
//     "doc_no": "007TT"

import {ISeh} from "../../../seh/seh.types";

export interface IDone {
    id: number,
    production_unit_id: number,
    seh_id: number,
    duration: number,
    cost: number,
    start_at: string,
    started_at: string,
    finish_at: string,
    finished_at: string,
    passed_at: string,
    sorder: number,
    amount: number,
    paid: boolean,

    doc_no: string,

    seh: ISeh

    prev?: IDone,
    next?: IDone,
}
