import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {IStep} from "./step.type";
import {SearchField} from "../../../../api/query.types";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class StepService {

    constructor(private _httpClient: HttpClient) {
    }

    getSteps(unit_ids: number[]): Observable<IStep[]> {

        let url: string = '@bu/api/production/unit-steps'

        const searchArr = [];

        if (unit_ids)
            searchArr.push({
                field: 'unit_ids',
                value: unit_ids
            })
        else
            searchArr.push({
                field: 'unit_ids',
                value: -1
            })

        const search: string = this.makeSearchString(searchArr);
        if (search.length)
            url += `?search=${search}`

        return this._httpClient.get<{ data: IStep[] }>(url).pipe(
            map(response => {
                return response.data
            })
        );
    }

    saveStep(step: IStep): Observable<{ success: boolean, message: string }> {
        console.log('serviceSaveStep', step.id)
        return this._httpClient.put<{
            success: boolean,
            message: string
        }>(`@bu/api/production/unit-steps/${step.id}`, {...step}).pipe(
            map(response => {
                console.log('serviceSavedStep', step.id)
                return {
                    success: response.success,
                    message: response.message
                }
            })
        );
    }

    private makeSearchString(params: SearchField[]) {
        if (params.length) {
            return params.map(item => `${item.field}:${item.value}`).join(';')
        } else {
            return ''
        }
    }

}
