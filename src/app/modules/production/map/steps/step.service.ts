import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {IMapUnitStep} from "./step.type";
import {SearchField} from "../../../../api/query.types";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class StepService {

    constructor(private _httpClient: HttpClient) {
    }

    getSteps(map_unit_ids: number[]): Observable<{ success: boolean, message: string, data: IMapUnitStep[] }> {

        let url: string = '/api/map-unit-steps'

        const searchArr = [];

        if (map_unit_ids)
            searchArr.push({
                field: 'map_unit_ids',
                value: map_unit_ids
            })
        else
            searchArr.push({
                field: 'map_unit_ids',
                value: -1
            })

        const search: string = this.makeSearchString(searchArr);
        if (search.length)
            url += `?search=${search}`

        return this._httpClient.get<{ success: boolean, message: string, data: IMapUnitStep[] }>(url).pipe(
            map(response => {
                return response
            })
        );
    }

    saveStep(step: IMapUnitStep): Observable<{ success: boolean, message: string, data?: IMapUnitStep }> {
        if (!step.id) {
            return this.addStep(step)
        }
        return this._httpClient.put<{
            success: boolean,
            message: string,
            data?: IMapUnitStep
        }>(`/api/map-unit-steps/${step.id}`, {...step}).pipe(
            map(response => {
                return {
                    data: response?.data,
                    success: response.success,
                    message: response.message
                }
            })
        );
    }

    addStep(step: IMapUnitStep): Observable<{ success: boolean, message: string, data?: IMapUnitStep }> {
        return this._httpClient.post<{
            success: boolean,
            message: string,
            data?: IMapUnitStep
        }>('/api/map-unit-steps', {...step}).pipe(
            map(response => {
                return {
                    data: response?.data,
                    success: response.success,
                    message: response.message
                }
            })
        );
    }

    deleteStep(step: IMapUnitStep): Observable<{ success: boolean, message: string }> {
        return this._httpClient.delete<{
            success: boolean,
            message: string
        }>(`/api/map-unit-steps/${step.id}`).pipe(
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
