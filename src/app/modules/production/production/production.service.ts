import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ProductionService {

    constructor(private _httpClient: HttpClient) {
    }

    /**
     * Get tips
     */
    createProductions(data: {}[]): Observable<{}> {
        return this._httpClient.post<{
            data: { id: string, doc_no: string }[]
        }>('/api/production/create-productions', {data: data}).pipe(
            map((response) => {
                return response.data
            })
        );
    }
}
