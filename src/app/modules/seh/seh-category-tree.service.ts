import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {BehaviorSubject, map, Observable, tap} from "rxjs";
import {ISeh} from "./seh.types";

@Injectable({
    providedIn: 'root'
})
export class SehCategoryTreeService {

    private _items: BehaviorSubject<any[]> = new BehaviorSubject([])

    get items$(): Observable<any[]> {
        return this._items.asObservable();
    }

    constructor(private _httpClient: HttpClient) {
    }

    /**
     * Get options like: cs1: zagatovka, s1: zagatovka1, s2: zagatovka2
     */
    getOptions(): Observable<any[]> {
        return this._httpClient.get<{ data: any[] }>('/api/production/seh-category-tree').pipe(
            tap((response) => {
                this._items.next(response.data);
            }),
            map(response => response.data)
        );
    }
}
