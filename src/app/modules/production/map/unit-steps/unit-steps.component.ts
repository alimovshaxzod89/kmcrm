import {Component, Input} from '@angular/core';
import {IStep} from "../steps/step.type";
import {ISeh} from "../../../seh/seh.types";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {setStep} from "../store/steps.actions";

@Component({
    selector: 'map-unit-steps',
    templateUrl: './unit-steps.component.html',
    styleUrls: ['./unit-steps.component.scss']
})
export class UnitStepsComponent {

    @Input() steps: IStep[];
    @Input() sehs: ISeh[];

    cost$: Observable<number>;

    stepPercentsById: number[] = []

    constructor(private store: Store<{ cost: number }>) {
        this.cost$ = store.select('cost');
    }

    getSehName(seh_id: number): string {
        const seh = this.sehs.find(seh => seh.id === seh_id)
        return seh?.name
    }

    onEditComplete(event) {
        let {
            field, data, index
        } = event

        console.log({field, data, index})

        if (field === 'percent') {
            const step_id = this.getStepIdByIndex(index)
            const percent: number = this.getHandledPercentByIndex(index)
            this.savePercent(index, percent, step_id)
        }
    }

    private getHandledPercentByIndex(index: number): number {
        const step_id = this.getStepIdByIndex(index)
        return this.stepPercentsById[step_id]
    }

    private getStepIdByIndex(index: number): number {
        return this.steps[index].id
    }

    private getStepByIndex(index: number): IStep {
        return this.steps[index]
    }

    private savePercent(index: number, percent: number, step_id: number) {

        if (percent === undefined) {
            percent = 0
        }

        const step = JSON.parse(JSON.stringify(this.getStepByIndex(index)))

        //calculate cost
        let cost = 0;
        this.cost$.subscribe(value => cost = value / 100 * percent)

        //set percent and cost
        step.percent = percent
        step.cost = cost

        this.store.dispatch(setStep({step_id, step}))
    }

    handlePercentChange(index: number, percent: number, step_id: number) {
        this.stepPercentsById[step_id] = percent
    }

    logEvent($event: any, asd: any) {
        console.log({$event, asd})
    }

    doNothing($event: any) {
        $event.stopPropagation();
        return;
    }

    stopIncreaseDecrease($event: any) {
        $event.stopPropagation();
        $event.preventDefault();
        return false;
    }
}
