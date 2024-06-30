import {Component, Input, ViewChild} from '@angular/core';
import {IMapUnitStep} from "../steps/step.type";
import {ISeh} from "../../../seh/seh.types";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {addStep, deleteStep, downStep, removeStep, resetStep, saveStep, setStep, upStep} from "../store/steps.actions";
import {Table} from "primeng/table";
import {MapState} from "../store/map.reducer";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'map-unit-steps',
    templateUrl: './unit-steps.component.html',
    styleUrls: ['./unit-steps.component.scss']
})
export class UnitStepsComponent {

    @Input() map_unit_id: number;
    @Input() steps: IMapUnitStep[];
    @Input() sehs: ISeh[];

    @ViewChild('dt') table: Table;

    cost$: Observable<number>;

    sehCategoryTree: any[];

    handledFieldById: Object = {}
    unTouchedHandledFieldById: Object = {}

    constructor(private store: Store<{ cost: MapState }>,
                private route: ActivatedRoute) {
        this.cost$ = store.select(store => store.cost.current);

        this.sehCategoryTree = this.route.snapshot.data.sehCategoryTree
    }

    getSehName(seh_id: number): string {
        const seh = this.sehs.find(seh => seh.id === seh_id)
        return seh?.name
    }

    private getTreeNodeType(key: string): string {
        return key.startsWith('cs') ? 'category' : 'seh';
    }

    sehCategoryTreeLabel(key: string): string | null {

        const type = this.getTreeNodeType(key);

        if (type === 'category') {
            const found = this.sehCategoryTree.find(node => node.key === key)
            return found && found.label || null;
        } else {
            for (const node of this.sehCategoryTree) {
                const found = node.children.find(child => child.key === key)
                if (found) {
                    return found.label;
                }
            }
            return null;
        }
    }

    sehCategoryTreeValue(key: string): string | null {

        const type = this.getTreeNodeType(key);

        let found = null;

        if (type === 'category') {
            found = this.sehCategoryTree.find(node => node.key === key)
        } else {
            for (const node of this.sehCategoryTree) {
                const foundI = node.children.find(child => child.key === key)
                if (foundI) {
                    found = foundI
                    break;
                }
            }
        }
        return found || null
    }

    onEditInit(event) {
        let {
            field, data, index
        } = event

        console.info('onEditInit', {field, data, index})

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
        console.info('onEditCancel', {field, data, index})

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

        if (field) {

            const step = JSON.parse(JSON.stringify(this.getStepByIndex(index)))

            const step_id = this.getStepIdByIndex(index)

            let value = this.getHandledFieldByIndex(index)

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

            if (field === 'seh_id') {
                if (typeof value === 'object') {
                    const type = this.getTreeNodeType(value.key);
                    if (type === 'category') {
                        //remove cs from key
                        step.category_seh_id = value.key.replace('cs', '');

                        value = null;
                    } else {
                        const parent = value.parent;
                        step.category_seh_id = parent.key.replace('cs', '');
                        //remove s from key
                        value = value.key.replace('s', '');
                    }
                }
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

    private getHandledFieldByIndex(index: number): any {
        const step_id = this.getStepIdByIndex(index)
        return this.handledFieldById[step_id]
    }

    private getStepIdByIndex(index: number): number {
        return this.steps[index].id
    }

    private getStepByIndex(index: number): IMapUnitStep {
        return this.steps[index]
    }

    handleFieldChange(step_id: number, value: number) {
        this.handledFieldById[step_id] = value
    }

    checkForChanged(step: IMapUnitStep): boolean {
        const item = {...step}
        delete item._hash

        return step._hash !== JSON.stringify(item)
    }

    private lastStepIsSaved(): boolean {
        //get last step
        const lastStep = this.steps[this.steps.length - 1]
        //save last step if not saved
        return !this.checkForChanged(lastStep);
    }

    private saveLastStep(): boolean {
        //close editing
        this.table.saveState()

        //get last step
        const lastStep = this.steps[this.steps.length - 1]
        //save last step if not saved
        return this.save(lastStep)
    }

    private saveLastStepAndRunAdd(attempt: number = 0) {

        let valid = true;

        if (attempt === 0) {
            //save last step in first attempt, because it is not saved yet
            valid = this.saveLastStep()
        }
        console.log('attempt', attempt)

        if (valid) {
            if (this.lastStepIsSaved()) {
                this.add()
            } else if (attempt < 5) {
                setTimeout(() => {
                    this.saveLastStepAndRunAdd(attempt + 1)
                }, 400)
            } else {
                alert('Oldingi qadamni saqlab bo\'lmadi!')
            }
        }
    }

    private validateStep(step: IMapUnitStep): boolean {
        return step.seh_id !== null && step.percent !== null && step.cost !== null
    }

    add() {
        setTimeout(() => {
            if (this.lastStepIsSaved()) {
                this.store.dispatch(addStep({map_unit_id: this.map_unit_id, rowIndex: this.steps.length}))
                this.openLastStepEditor()
            } else {
                this.saveLastStepAndRunAdd()
            }
        }, 400)
    }

    private openLastStepEditor() {
        setTimeout(() => {
            const elementId = `ce_u${this.map_unit_id}_ri${this.steps.length - 1}`
            document.getElementById(elementId).click()
        }, 600)
    }

    save(step: IMapUnitStep) {
        if (this.validateStep(step)) {
            this.store.dispatch(saveStep({step}))
            return true;
        } else {
            alert('Ma\'lumotlar to\'liq emas!')
            return false;
        }
    }

    reset(step: IMapUnitStep) {
        this.store.dispatch(resetStep({step}))
    }

    protected readonly length = length;

    delete(step: IMapUnitStep) {

        if (step.id === null) {
            this.store.dispatch(removeStep({step}))
            return;
        }

        if (confirm('Вы уверены?')) {
            this.store.dispatch(deleteStep({step}))
        }
    }

    up(step: IMapUnitStep) {
        this.store.dispatch(upStep({step}))
    }

    down(step: IMapUnitStep) {
        this.store.dispatch(downStep({step}))
    }
}
