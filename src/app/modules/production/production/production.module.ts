import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductionComponent} from './production.component';
import {RouterModule} from "@angular/router";
import {productionRoutes} from "./production.routes";
import {AddModalComponent} from './add-modal/add-modal.component';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {SharedModule} from "../../../shared/shared.module";
import {CalendarModule} from 'primeng/calendar';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {TableComponent} from './table/table.component';
import {DropdownModule} from "primeng/dropdown";
import {InputNumberModule} from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
    declarations: [
        ProductionComponent,
        AddModalComponent,
        TableComponent,
    ],
    imports: [
        RouterModule.forChild(productionRoutes),
        CommonModule,
        ButtonModule,
        DialogModule,
        TableModule,
        InputTextModule,
        SharedModule,
        CalendarModule,
        AutoCompleteModule,
        DropdownModule,
        InputNumberModule,
        InputTextareaModule
    ]
})
export class ProductionModule {
}
