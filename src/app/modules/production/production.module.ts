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

import {productionRoutes} from "./production.routing";
import {MapComponent} from './map/map.component';

import {FilterMuiComponent} from './map/filter-mui/filter-mui.component';
import {UnitsComponent} from './map/units/units.component';
import {StepsComponent} from './map/steps/steps.component';
import {UnitStepsComponentMui} from "./map/unit-steps-mui/unit-steps-component-mui.component";
import {UnitStepsComponent} from "./map/unit-steps/unit-steps.component";

import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {InputTextModule} from "primeng/inputtext";
import {InputNumberModule} from 'primeng/inputnumber';
import {DropdownModule} from "primeng/dropdown";


import { StoreModule } from '@ngrx/store';
import { costReducer } from './map/store/cost.reducer';
import { FilterComponent } from './map/filter/filter.component';


@NgModule({
    declarations: [
        MapComponent,
        FilterMuiComponent,
        UnitsComponent,
        StepsComponent,
        UnitStepsComponentMui,
        UnitStepsComponent,
        FilterComponent
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

        ButtonModule,
        TableModule,
        InputTextModule,
        InputNumberModule,
        DropdownModule,

        StoreModule.forRoot({cost: costReducer})
    ]
})
export class ProductionModule {
}
