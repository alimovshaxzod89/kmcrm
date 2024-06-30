import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {TipService} from "./services/tip.service";
import {ITip} from "./types/tip.type";
import {SehService} from "../seh/seh.service";
import {ISeh} from "../seh/seh.types";
import {SehCategoryTreeService} from "../seh/seh-category-tree.service";


@Injectable({
    providedIn: 'root'
})
export class TipsResolver  {

    constructor(private _tipService: TipService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITip[]> {
        return this._tipService.getTips();
    }
}

@Injectable({
    providedIn: 'root'
})
export class SehsResolver  {

    constructor(private _tipService: SehService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISeh[]> {
        return this._tipService.getSehs();
    }
}

@Injectable({
    providedIn: 'root'
})
export class sehCategoryTreeResolver {

    constructor(private _service: SehCategoryTreeService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISeh[]> {
        return this._service.getOptions();
    }
}
