import {Component, Input, OnInit} from '@angular/core';
import {IUnit} from "../units/unit.type";
import {Observable} from "rxjs";
import {IStep} from "./step.type";
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

    units$: Observable<IUnit[]>;
    units: IUnit[];

    steps$: Observable<IStep[]>
    steps: IStep[]

    stepsByUnitId: Object

    constructor(private _stepService: StepService,
                private store: Store<{ units: IUnit[], steps: IStep[] }>) {

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
                if (step.unit_id == unit.id) {
                    this.stepsByUnitId[unit.id].push(step)
                }
            })
        })
    }

}
