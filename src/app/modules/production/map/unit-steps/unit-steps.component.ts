import {Component, Input, ViewChild} from '@angular/core';
import {IMapUnitStep} from "../steps/step.type";
import {ISeh} from "../../../seh/seh.types";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {addStep, deleteStep, downStep, removeStep, resetStep, saveStep, setStep, upStep} from "../store/steps.actions";
import {Table} from "primeng/table";
import {MapState} from "../store/map.reducer";

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


    handledFieldById: Object = {}
    unTouchedHandledFieldById: Object = {}

    nodes = [
        {
          key: '0',
          label: 'Documents',
          data: 'Documents Folder',
          icon: 'pi pi-fw pi-inbox',
          children: [
            {
              key: '0-0',
              label: 'Work',
              data: 'Work Folder',
              icon: 'pi pi-fw pi-cog',
              children: [
                { key: '0-0-0', label: 'Expenses.doc', icon: 'pi pi-fw pi-file', data: 'Expenses Document' },
                { key: '0-0-1', label: 'Resume.doc', icon: 'pi pi-fw pi-file', data: 'Resume Document' }
              ]
            },
            {
              key: '0-1',
              label: 'Home',
              data: 'Home Folder',
              icon: 'pi pi-fw pi-home',
              children: [{ key: '0-1-0', label: 'Invoices.txt', icon: 'pi pi-fw pi-file', data: 'Invoices for this month' }]
            }
          ]
        },
        {
          key: '1',
          label: 'Events',
          data: 'Events Folder',
          icon: 'pi pi-fw pi-calendar',
          children: [
            { key: '1-0', label: 'Meeting', icon: 'pi pi-fw pi-calendar-plus', data: 'Meeting' },
            { key: '1-1', label: 'Product Launch', icon: 'pi pi-fw pi-calendar-plus', data: 'Product Launch' },
            { key: '1-2', label: 'Report Review', icon: 'pi pi-fw pi-calendar-plus', data: 'Report Review' }
          ]
        },
        {
          key: '2',
          label: 'Movies',
          data: 'Movies Folder',
          icon: 'pi pi-fw pi-star-fill',
          children: [
            {
              key: '2-0',
              icon: 'pi pi-fw pi-star-fill',
              label: 'Al Pacino',
              data: 'Pacino Movies',
              children: [
                { key: '2-0-0', label: 'Scarface', icon: 'pi pi-fw pi-video', data: 'Scarface Movie' },
                { key: '2-0-1', label: 'Serpico', icon: 'pi pi-fw pi-video', data: 'Serpico Movie' }
              ]
            },
            {
              key: '2-1',
              label: 'Robert De Niro',
              icon: 'pi pi-fw pi-star-fill',
              data: 'De Niro Movies',
              children: [
                { key: '2-1-0', label: 'Goodfellas', icon: 'pi pi-fw pi-video', data: 'Goodfellas Movie' },
                { key: '2-1-1', label: 'Untouchables', icon: 'pi pi-fw pi-video', data: 'Untouchables Movie' }
              ]
            }
          ]
        }
      ];
    
      selectedNodes: any;

        // Methods for node selection/unselection
        selectNode(event: any) {
        console.log('Selected Node:', event.node);
        }

        unselectNode(event: any) {
        console.log('Unselected Node:', event.node);
        }

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

    private getStepByIndex(index: number): IMapUnitStep {
        return this.steps[index]
    }

    handleFieldChange(step_id: number, value: number,) {
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
