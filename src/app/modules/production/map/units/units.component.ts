import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {IUnit} from "./unit.type";
import {UnitService} from "./unit.service";
import {Store} from "@ngrx/store";

@Component({
    selector: 'map-units',
    templateUrl: './units.component.html',
    styleUrls: ['./units.component.scss']
})
export class UnitsComponent implements OnInit {

    units$: Observable<IUnit[]>;

    displayedColumns: string[] = [
        'del', 'tip', 'percent', 'more'
    ];

    constructor(private _unitService: UnitService,
                private store: Store<{ units: IUnit[] }>) {
    }

    ngOnInit(): void {

        this.units$ = this.store.select('units');
    }
}
