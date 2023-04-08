import {Component, OnInit} from '@angular/core';
import {FurnitureService} from "../../furniture/furniture.service";
import {BehaviorSubject, Observable} from "rxjs";
import {IUnit} from "./units/unit.type";
import {UnitService} from "./units/unit.service";
import {ISeh} from "../../seh/seh.types";
import {SehService} from "../../seh/seh.service";
import {Store} from "@ngrx/store";

@Component({
    selector: 'app-map',
    styleUrls: ['./map.component.scss'],
    templateUrl: './map.component.html',
})
export class MapComponent implements OnInit {

    isLoading: boolean = false;
    map_id$: BehaviorSubject<number> = new BehaviorSubject<number>(null);
    unit_id: number = null;

    sehs$: Observable<ISeh[]>;

    units$: BehaviorSubject<IUnit[]> = new BehaviorSubject<IUnit[]>([]);

    cost$: Observable<number>;

    constructor(private _furnitureService: FurnitureService,
                private _unitService: UnitService,
                private _sehService: SehService,
                private store: Store<{ cost: number }>) {
        this.cost$ = store.select('cost');
    }

    ngOnInit() {
        // this.isLoading = true;

        this.map_id$.subscribe(value => {

            if (value) {
                this._unitService.getUnits(value).subscribe(units => {
                    this.units$.next(units)
                })
            } else {
                this.units$.next([])
            }

        })

        this.units$.subscribe(value => {
            console.error(this.map_id$.value, value)
        })

        //load sehs
        this._sehService.getSehs().subscribe(values => {
            console.log('sehlar yuklandi')
        });
        this.sehs$ = this._sehService.sehs$;
    }

}
