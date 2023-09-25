import {Component, Input, OnInit} from '@angular/core';
import {IMapUnit} from "../units/unit.type";
import {Observable} from "rxjs";
import {IMapUnitStep} from "./step.type";
import {StepService} from "./step.service";
import {ISeh} from "../../../seh/seh.types";
import {Store} from "@ngrx/store";

@Component({
    selector: 'map-steps',
    templateUrl: './steps.component.html',
    styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnInit {

    @Input() sehs: ISeh[];
    @Input() tips: { id: number, name: string }[];

    units$: Observable<IMapUnit[]>;
    units: IMapUnit[];

    steps$: Observable<IMapUnitStep[]>
    steps: IMapUnitStep[]

    stepsByUnitId: Object

    constructor(private _stepService: StepService,
                private store: Store<{ units: IMapUnit[], steps: IMapUnitStep[] }>) {

        this.units$ = this.store.select('units');
        this.steps$ = this.store.select('steps');

        this.units$.subscribe(units => {
            this.units = units
            this.makeStepsByUnit()
        })

        this.steps$.subscribe(steps => {
            this.steps = steps
            this.makeStepsByUnit()
        })
    }

    ngOnInit(): void {

    }

    private makeStepsByUnit() {
        this.stepsByUnitId = []

        this.units.forEach(unit => {
            this.stepsByUnitId[unit.id] = []

            this.steps.forEach(step => {
                if (step.map_unit_id == unit.id) {
                    this.stepsByUnitId[unit.id].push(step)
                }
            })
        })
    }

    getTipName(tip_id: number): string {

        if (typeof this.tips !== 'object' || !this.tips.length) {
            console.error('no tips', this.tips)
            return ''
        }

        const tip = this.tips.find(tip => tip.id === tip_id)
        return tip?.name
    }

}
