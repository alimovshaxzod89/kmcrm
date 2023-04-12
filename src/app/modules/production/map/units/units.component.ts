import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {IUnit} from "./unit.type";
import {UnitService} from "./unit.service";
import {Store} from "@ngrx/store";
import {IStep} from "../steps/step.type";

@Component({
    selector: 'map-units',
    templateUrl: './units.component.html',
    styleUrls: ['./units.component.scss']
})
export class UnitsComponent implements OnInit {

    units$: Observable<IUnit[]>;
    steps$: Observable<IStep[]>;

    displayedColumns: string[] = [
        'del', 'tip', 'percent', 'cost',
        // 'more'
    ];

    constructor(private _unitService: UnitService,
                private store: Store<{ units: IUnit[], steps: IStep[] }>) {
    }

    ngOnInit(): void {

        this.units$ = this.store.select('units');
        this.steps$ = this.store.select('steps');
    }

    calcRowCost(unit_id: number): number {
        let cost = 0;
        this.steps$.subscribe(steps => {
            steps.forEach(step => {
                if (step.unit_id === unit_id) {
                    cost += step.cost
                }
            })
        })
        return cost
    }

    calcRowPercent(unit_id: number): number {
        let percent = 0;
        this.steps$.subscribe(steps => {
            steps.forEach(step => {
                if (step.unit_id === unit_id) {
                    percent += step.percent
                }
            })
        })
        return percent
    }
}
