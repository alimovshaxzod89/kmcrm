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
    getMaps(furniture_id: number = null): Observable<IMap[]> {

        let url: string = '@bu/api/production/maps'

        const searchArr = [];

        if (furniture_id)
            searchArr.push({
                field: 'furniture_id',
                value: furniture_id
            })

        const search: string = this.makeSearchString(searchArr);
        if (search.length)
            url += `?search=${search}`

        return this._httpClient.get<{ data: IMap[] }>(url).pipe(
            map(response => {
                return response.data
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
