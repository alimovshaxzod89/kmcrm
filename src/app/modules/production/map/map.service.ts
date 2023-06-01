import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {SearchField} from "../../../api/query.types";
import {HttpClient} from "@angular/common/http";
import {IMap} from "./map.types";

@Injectable({
    providedIn: 'root'
})
export class MapService {

    constructor(private _httpClient: HttpClient) {
    }

    /**
     * Get furniture maps
     */
    getMaps(furniture_id: number = null): Observable<{ success: boolean, message: string, data: IMap[] }> {

        let url: string = '/api/production/maps'

        const searchArr = [];

        if (furniture_id)
            searchArr.push({
                field: 'furniture_id',
                value: furniture_id
            })

        const search: string = this.makeSearchString(searchArr);
        if (search.length)
            url += `?search=${search}`

        return this._httpClient.get<{ success: boolean, message: string, data: IMap[] }>(url).pipe(
            map(response => {
                return response
            })
        );
    }

    /**
     * Get furniture maps
     */
    getMap(id: number): Observable<{ success: boolean, message: string, data: IMap }> {

        return this._httpClient.get<{
            success: boolean,
            message: string,
            data: IMap
        }>(`/api/production/maps/${id}`).pipe(
            map(response => {
                return response
            })
        );
    }

    saveMapCost(map_id: number, cost: number): Observable<{ success: boolean, message: string }> {
        return this._httpClient.put<{
            success: boolean,
            message: string
        }>(`/api/production/maps/${map_id}`, {cost}).pipe(
            map(response => {
                return {
                    success: response.success,
                    message: response.message
                }
            })
        );
    }

    saveMap(mapData: IMap): Observable<{ success: boolean, message: string, data?: IMap }> {
        return this._httpClient.put<{
            success: boolean,
            message: string,
            data?: IMap
        }>(`/api/production/maps/${mapData.id}`, {...mapData}).pipe(
            map(response => {
                return response
            })
        );
    }

    addMap(mapData: IMap): Observable<{ success: boolean, message: string, data?: IMap }> {
        return this._httpClient.post<{
            success: boolean,
            message: string,
            data?: IMap
        }>(`/api/production/maps`, {...mapData}).pipe(
            map(response => {
                return response
            })
        );
    }


    deleteMap(map_id: number): Observable<{ success: boolean, message: string }> {
        return this._httpClient.delete<{
            success: boolean,
            message: string
        }>(`/api/production/maps/${map_id}`).pipe(
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
