import {Injectable} from '@angular/core';
import {
    Router, Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import {Observable, of} from 'rxjs';
import {FurnitureService} from "./furniture.service";
import {Category, Komplekt} from "./furniture.types";

@Injectable({
    providedIn: 'root'
})
export class CategoriesResolver implements Resolve<any> {
    constructor(private _furnitureService: FurnitureService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Category[]> {
        return this._furnitureService.getCategories();
    }
}

@Injectable({
    providedIn: 'root'
})
export class KomplektsResolver implements Resolve<any> {

    constructor(private _furnitureService: FurnitureService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Komplekt[]> {
        return this._furnitureService.getKomplekts();
    }
}
