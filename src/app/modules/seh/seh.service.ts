import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {Category} from "../furniture/furniture.types";
import {ISeh} from "./seh.types";

@Injectable({
    providedIn: 'root'
})
export class SehService {

    private _sehs: BehaviorSubject<ISeh[]> = new BehaviorSubject([])

    get sehs$(): Observable<Category[]> {
        return this._sehs.asObservable();
    }

    constructor(private _httpClient: HttpClient) {
    }

    /**
     * Get sehs
     */
    getSehs(): Observable<{ data: ISeh[] }> {
        return this._httpClient.get<{ data: Category[] }>('@bu/api/production/sehs').pipe(
            tap((response) => {
                this._sehs.next(response.data);
            })
        );
    }
}
