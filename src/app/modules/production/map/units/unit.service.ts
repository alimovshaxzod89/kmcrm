import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {SearchField} from "../../../../api/query.types";
import {map, Observable} from "rxjs";
import {IMapUnit} from "./unit.type";

@Injectable({
    providedIn: 'root'
})
export class UnitService {
    constructor(private _httpClient: HttpClient) {
    }

    /**
     * Get furniture maps
     */
    getUnits(map_id: number = null): Observable<{ success: boolean, message: string, data: IMapUnit[] }> {

        let url: string = '/api/map-units'

        const searchArr = [];

        if (map_id)
            searchArr.push({
                field: 'map_id',
                value: map_id
            })
        else
            searchArr.push({
                field: 'map_id',
                value: -1
            })

        const search: string = this.makeSearchString(searchArr);
        if (search.length)
            url += `?search=${search}`

        return this._httpClient.get<{ success: boolean, message: string, data: IMapUnit[] }>(url).pipe(
            map(response => {
                return response
            })
        );
    }

    saveUnit(unit: IMapUnit): Observable<{ success: boolean, message: string, data?: IMapUnit }> {
        if (!unit.id) {
            return this.addUnit(unit)
        }
        return this._httpClient.put<{
            success: boolean,
            message: string,
            data?: IMapUnit
        }>(`/api/map-units/${unit.id}`, {...unit}).pipe(
            map(response => {
                return {
                    data: response?.data,
                    success: response.success,
                    message: response.message
                }
            })
        );
    }

    addUnit(unit: IMapUnit): Observable<{ success: boolean, message: string, data?: IMapUnit }> {
        return this._httpClient.post<{
            success: boolean,
            message: string,
            data?: IMapUnit
        }>('/api/map-units', {...unit}).pipe(
            map(response => {
                return {
                    data: response?.data,
                    success: response.success,
                    message: response.message
                }
            })
        );
    }

    deleteUnit(unit: IMapUnit): Observable<{ success: boolean, message: string }> {
        return this._httpClient.delete<{
            success: boolean,
            message: string
        }>(`/api/map-units/${unit.id}`).pipe(
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
