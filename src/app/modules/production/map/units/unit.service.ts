import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {SearchField} from "../../../../api/query.types";
import {map, Observable} from "rxjs";
import {IUnit} from "./unit.type";

@Injectable({
    providedIn: 'root'
})
export class UnitService {
    constructor(private _httpClient: HttpClient) {
    }

    /**
     * Get furniture maps
     */
    getUnits(map_id: number = null): Observable<IUnit[]> {

        let url: string = '@bu/api/production/units'

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

        return this._httpClient.get<{ data: IUnit[] }>(url).pipe(
            map(response => {
                console.log('serviceUnits', response)
                return response.data
            })
        );
    }

    saveUnit(unit: IUnit): Observable<{ success: boolean, message: string, data?: IUnit }> {
        if (!unit.id) {
            return this.addUnit(unit)
        }
        return this._httpClient.put<{
            success: boolean,
            message: string,
            data?: IUnit
        }>(`@bu/api/production/units/${unit.id}`, {...unit}).pipe(
            map(response => {
                console.log('serviceSavedUnit', response)
                return {
                    data: response?.data,
                    success: response.success,
                    message: response.message
                }
            })
        );
    }

    addUnit(unit: IUnit): Observable<{ success: boolean, message: string, data?: IUnit }> {
        return this._httpClient.post<{
            success: boolean,
            message: string,
            data?: IUnit
        }>('@bu/api/production/units', {...unit}).pipe(
            map(response => {
                console.log('serviceSavedUnit', response)
                return {
                    data: response?.data,
                    success: response.success,
                    message: response.message
                }
            })
        );
    }

    deleteUnit(unit: IUnit): Observable<{ success: boolean, message: string }> {
        return this._httpClient.delete<{
            success: boolean,
            message: string
        }>(`@bu/api/production/units/${unit.id}`).pipe(
            map(response => {
                console.log('service.deleteUnit', response)
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
