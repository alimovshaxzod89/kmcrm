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
                console.log(response)
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
