import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {IUnit} from "./unit.type";
import {UnitService} from "./unit.service";
import {Store} from "@ngrx/store";
import {IStep} from "../steps/step.type";
import {MapState} from "../store/map.reducer";
import {addUnit, deleteUnit, removeUnit, saveUnit, setUnit} from "../store/units.actions";
import * as stepSelects from "../store/steps.selectors";

@Component({
    selector: 'map-units',
    templateUrl: './units.component.html',
    styleUrls: ['./units.component.scss']
})
export class UnitsComponent implements OnInit {

    protected readonly Math = Math;

    units$: Observable<IUnit[]>;
    steps$: Observable<IStep[]>;
    @Input() map_id: number;
    @Input() tips: { id: number, name: string }[];

    cost$: Observable<number>;
    cost: number;

    totalCost$: Observable<number>;
    totalPercent$: Observable<number>;

    constructor(private _unitService: UnitService,
                private store: Store<{ units: IUnit[], steps: IStep[], cost: MapState }>) {
        this.cost$ = this.store.select(store => store.cost.current);

        this.totalCost$ = this.store.select(stepSelects.selectTotalCost);
        this.totalPercent$ = this.store.select(stepSelects.selectTotalPercent);
    }

    ngOnInit(): void {

        this.cost$.subscribe(cost => this.cost = cost)

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

    getTipName(tip_id: number): string {

        if (typeof this.tips !== 'object' || !this.tips.length) {
            console.error('no tips', this.tips)
            return ''
        }

        const tip = this.tips.find(tip => tip.id === tip_id)
        return tip?.name
    }

    checkForChanged(unit: IUnit): boolean {
        const item = {...unit}
        delete item._hash

        return unit._hash !== JSON.stringify(item)
    }

    handleFieldChange(unit: IUnit, tip_id: number) {
        this.store.dispatch(setUnit({unit_id: unit.id, unit: {...unit, tip_id: tip_id}}))
    }

    add() {
        this.store.dispatch(addUnit({map_id: this.map_id}))
    }

    save(unit: IUnit) {
        this.store.dispatch(saveUnit({unit}))
    }

    // reset(unit: IUnit) {
    //     this.store.dispatch(resetUnit({step}))
    // }

    delete(unit: IUnit) {

        if (unit.id === null) {
            this.store.dispatch(removeUnit({unit}))
            return;
        }

        if (confirm('Вы уверены?')) {
            this.store.dispatch(deleteUnit({unit}))
        }
    }
}
