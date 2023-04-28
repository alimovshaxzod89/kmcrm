import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {BehaviorSubject, map, Observable} from "rxjs";
import {ITip} from "../types/tip.type"

@Injectable({
    providedIn: 'root'
})
export class TipService {

    constructor(private _httpClient: HttpClient) {
    }

    /**
     * Get tips
     */
    getTips(): Observable<ITip[]> {
        return this._httpClient.get<{ data: ITip[] }>('@bu/api/production/tips').pipe(
            map((response) => {
                return response.data
            })
        );
    }
}
