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

    getSteps(unit_ids: number[]): Observable<{ success: boolean, message: string, data: IStep[] }> {

        let url: string = '/api/production/unit-steps'

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

        return this._httpClient.get<{ success: boolean, message: string, data: IStep[] }>(url).pipe(
            map(response => {
                return response
            })
        );
    }

    saveStep(step: IStep): Observable<{ success: boolean, message: string, data?: IStep }> {
        if (!step.id) {
            return this.addStep(step)
        }
        return this._httpClient.put<{
            success: boolean,
            message: string,
            data?: IStep
        }>(`/api/production/unit-steps/${step.id}`, {...step}).pipe(
            map(response => {
                return {
                    data: response?.data,
                    success: response.success,
                    message: response.message
                }
            })
        );
    }

    addStep(step: IStep): Observable<{ success: boolean, message: string, data?: IStep }> {
        return this._httpClient.post<{
            success: boolean,
            message: string,
            data?: IStep
        }>('/api/production/unit-steps', {...step}).pipe(
            map(response => {
                return {
                    data: response?.data,
                    success: response.success,
                    message: response.message
                }
            })
        );
    }

    deleteStep(step: IStep): Observable<{ success: boolean, message: string }> {
        return this._httpClient.delete<{
            success: boolean,
            message: string
        }>(`/api/production/unit-steps/${step.id}`).pipe(
            map(response => {
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
