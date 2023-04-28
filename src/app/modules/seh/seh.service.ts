import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {BehaviorSubject, map, Observable, tap} from "rxjs";
import {ISeh} from "./seh.types";

@Injectable({
    providedIn: 'root'
})
export class SehService {

    private _sehs: BehaviorSubject<ISeh[]> = new BehaviorSubject([])

    get sehs$(): Observable<ISeh[]> {
        return this._sehs.asObservable();
    }

    constructor(private _httpClient: HttpClient) {
    }

    /**
     * Get sehs
     */
    getSehs(): Observable<ISeh[]> {
        return this._httpClient.get<{ data: ISeh[] }>('@bu/api/production/sehs').pipe(
            tap((response) => {
                this._sehs.next(response.data);
            }),
            map(response => {
                    return response.data
                }
            )
        );
    }
}
