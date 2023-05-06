import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {TipService} from "./services/tip.service";
import {ITip} from "./types/tip.type";
import {SehService} from "../seh/seh.service";
import {ISeh} from "../seh/seh.types";


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
