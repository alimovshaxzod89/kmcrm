import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {MatSelectModule} from "@angular/material/select";
import {SharedModule} from 'app/shared/shared.module';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";

import {GridModule} from '@progress/kendo-angular-grid';
import {DropDownsModule} from "@progress/kendo-angular-dropdowns";
import {LabelModule} from "@progress/kendo-angular-label";
import {InputsModule} from "@progress/kendo-angular-inputs";
import {ButtonsModule} from "@progress/kendo-angular-buttons";
import {DateInputsModule} from '@progress/kendo-angular-dateinputs';

import {productionRoutes} from "./production.routing";
import {MapComponent} from './map/map.component';

import {FilterMuiComponent} from './map/filter-mui/filter-mui.component';
import {FilterKuiComponent} from './map/filter-kui/filter-kui.component';
import {UnitsComponent} from './map/units/units.component';


@NgModule({
    declarations: [
        MapComponent,
        FilterMuiComponent,
        FilterKuiComponent,
        UnitsComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(productionRoutes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatSortModule,
        MatTableModule,
        MatSelectModule,
        SharedModule,
        MatAutocompleteModule,
        NgxMatSelectSearchModule,

        GridModule,
        DropDownsModule,
        LabelModule,
        InputsModule,
        ButtonsModule,
        DateInputsModule,
    ]
})
export class ProductionModule {
}
