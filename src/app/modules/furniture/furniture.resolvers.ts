import {Injectable} from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import {Observable, of} from 'rxjs';
import {FurnitureService} from "./furniture.service";
import {Category, Komplekt} from "./furniture.types";

@Injectable({
    providedIn: 'root'
})
export class CategoriesResolver  {
    constructor(private _furnitureService: FurnitureService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Category[]> {
        return this._furnitureService.getCategories();
    }
}

@Injectable({
    providedIn: 'root'
})
export class KomplektsResolver  {

    constructor(private _furnitureService: FurnitureService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Komplekt[]> {
        return this._furnitureService.getKomplekts();
    }
}
