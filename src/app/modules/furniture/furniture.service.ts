import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable, tap} from "rxjs";
import {Category, Furniture, Komplekt} from "./furniture.types";
import {SearchField} from "../../api/query.types";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class FurnitureService {

    private _categories: BehaviorSubject<Category[] | null> = new BehaviorSubject(null)

    private _komplekts: BehaviorSubject<Komplekt[] | null> = new BehaviorSubject(null);

    private _furnitures: BehaviorSubject<Furniture[] | null> = new BehaviorSubject(null);

    constructor(
        private _httpClient: HttpClient
    ) {
    }

    get categories$(): Observable<Category[]> {
        return this._categories.asObservable();
    }

    get komplekts$(): Observable<Komplekt[]> {
        return this._komplekts.asObservable();
    }

    get furnitures(): Observable<Komplekt[]> {
        return this._komplekts.asObservable();
    }

    /**
     * Get categories
     */
    getCategories(): Observable<Category[]> {
        return this._httpClient.get<{ data: Category[] }>('@bu/api/furniture/categories').pipe(
            tap((response) => {
                this._categories.next(response.data);
            }),
            map(response => {
                return response.data
            })
        );
    }

    /**
     * Get komplekts
     */
    getKomplekts(): Observable<Komplekt[]> {
        return this._httpClient.get<{ data: Komplekt[] }>('@bu/api/furniture/komplekts').pipe(
            tap((response) => {
                this._komplekts.next(response.data);
            }),
            map(response => {
                return response.data
            })
        );
    }

    /**
     * Get furnitures
     */
    getFurnitures(category_id: number = null, komplekt_id: number = null): Observable<Furniture[]> {

        let url: string = '@bu/api/furniture/furnitures'

        const searchArr = [];

        if (category_id)
            searchArr.push({
                field: 'category_id',
                value: category_id
            })

        if (komplekt_id)
            searchArr.push({
                field: 'komplekt_id',
                value: komplekt_id
            })

        const search: string = this.makeSearchString(searchArr);
        if (search.length)
            url += `?search=${search}`

        return this._httpClient.get<{ data: Furniture[] }>(url).pipe(
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
