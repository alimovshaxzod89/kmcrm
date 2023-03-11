import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {FurnitureService} from "../furniture/furniture.service";
import {Observable} from "rxjs";
import {Category} from "../furniture/furniture.types";
import {Injectable} from "@angular/core";
import {Komplekt} from "../furniture/furniture.types";


@Injectable({
    providedIn: 'root'
})
export class CategoriesResolver implements Resolve<any> {

    constructor(private _furnitureService: FurnitureService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{
        data: Category[]
    }> {
        return this._furnitureService.getCategories();
    }
}
