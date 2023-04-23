import {Component, Input, ViewChild} from '@angular/core';
import {IStep} from "../steps/step.type";
import {ISeh} from "../../../seh/seh.types";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {saveStep, setStep} from "../store/steps.actions";
import {Table} from "primeng/table";
import {MapState} from "../store/map.reducer";

@Component({
    selector: 'map-unit-steps',
    templateUrl: './unit-steps.component.html',
    styleUrls: ['./unit-steps.component.scss']
})
export class UnitStepsComponent {

    @Input() steps: IStep[];
    @Input() sehs: ISeh[];

    @ViewChild('dt') table: Table;

    cost$: Observable<number>;


    handledFieldById: Object = {}
    unTouchedHandledFieldById: Object = {}

    constructor(private store: Store<{ cost: MapState }>) {
        this.cost$ = store.select(store => store.cost.current);
    }

    getSehName(seh_id: number): string {
        const seh = this.sehs.find(seh => seh.id === seh_id)
        return seh?.name
    }

    onEditInit(event) {
        let {
            field, data, index
        } = event

        console.log('onEditInit', {field, data, index})

        const step_id = this.getStepIdByIndex(index)
        if (field) {

            const step = JSON.parse(JSON.stringify(this.getStepByIndex(index)))

            this.unTouchedHandledFieldById[step_id] = step[field]
            this.handledFieldById[step_id] = step[field]
        }
    }

    onEditCancel(event) {
        let {
            field, data, index
        } = event
        console.log('onEditCancel', {field, data, index})

        const step = JSON.parse(JSON.stringify(this.getStepByIndex(index)))

        const step_id = this.getStepIdByIndex(index)

        step[field] = this.unTouchedHandledFieldById[step_id]

        this.handledFieldById[step_id] = this.unTouchedHandledFieldById[step_id]

        this.store.dispatch(setStep({step_id, step}))
    }

    onEditComplete(event) {
        let {
            field, data, index
        } = event

        console.log('onEditComplete', {field, data, index})

        if (field) {

            const step = JSON.parse(JSON.stringify(this.getStepByIndex(index)))

            const step_id = this.getStepIdByIndex(index)

            let value = this.getHandledFieldByIndex(index)

            console.log({value})

            if (field === 'percent') {
                if (value === undefined) {
                    value = 0
                }

                step.cost = this.calcCost(value);
            } else if (field === 'cost') {
                if (value === undefined) {
                    value = 0
                }

                step.percent = this.calcPercent(value);
            }

            step[field] = value

            this.store.dispatch(setStep({step_id, step}))
        }

    }

    private calcCost(percent: number): number {
        let cost = 0;
        this.cost$.subscribe(value => cost = value * percent / 100)

        return cost;
    }

    private calcPercent(cost: number): number {
        let percent = 0;
        this.cost$.subscribe(value => (value > 0 ? (percent = cost * 100 / value) : 0))

        return percent;
    }

    private getHandledFieldByIndex(index: number): number {
        const step_id = this.getStepIdByIndex(index)
        return this.handledFieldById[step_id]
    }

    private getStepIdByIndex(index: number): number {
        return this.steps[index].id
    }

    private getStepByIndex(index: number): IStep {
        return this.steps[index]
    }

    handleFieldChange(step_id: number, value: number,) {
        this.handledFieldById[step_id] = value
    }

    checkForChanged(step: IStep): boolean {
        const item = {...step}
        delete item._hash

        return step._hash !== JSON.stringify(item)
    }

    save(step: IStep) {
        this.store.dispatch(saveStep({step}))
    }
}
