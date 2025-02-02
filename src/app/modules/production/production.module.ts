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
import { TreeSelectModule } from 'primeng/treeselect';

import {productionRoutes} from "./production.routing";
import {MapComponent} from './map/map.component';

import {FilterComponent} from './map/filter/filter.component';
import {UnitsComponent} from './map/units/units.component';
import {StepsComponent} from './map/steps/steps.component';
import {UnitStepsComponentMui} from "./map/unit-steps-mui/unit-steps-component-mui.component";
import {UnitStepsComponent} from "./map/unit-steps/unit-steps.component";

import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {InputTextModule} from "primeng/inputtext";
import {InputNumberModule} from 'primeng/inputnumber';
import {DropdownModule} from "primeng/dropdown";
import {ChartModule} from 'primeng/chart';
import {DialogModule} from "primeng/dialog";
import {InputTextareaModule} from "primeng/inputtextarea";
import {InputSwitchModule} from "primeng/inputswitch";
import {AutoFocusModule} from "primeng/autofocus";

import {BlockLateralArrowNavigationDirective} from "../../directives/block-lateral-arrow-navigation.directive";
import {MatMenuModule} from "@angular/material/menu";

import {ReadyInSummaryComponent} from './reports/ready-in-summary/ready-in-summary.component';
import {SehStatusComponent} from './reports/seh-status/seh-status.component';
import {SehYuklanmaComponent} from './reports/seh-yuklanma/seh-yuklanma.component';
import {SehEarnMonthComponent} from './reports/seh-earn-month/seh-earn-month.component';
import {MapModalComponent} from './map/map-modal/map-modal.component';

@NgModule({
    declarations: [
        MapComponent,
        UnitsComponent,
        StepsComponent,
        UnitStepsComponentMui,
        UnitStepsComponent,
        FilterComponent,
        ReadyInSummaryComponent,
        SehStatusComponent,

        BlockLateralArrowNavigationDirective,
        SehYuklanmaComponent,
        SehEarnMonthComponent,
        MapModalComponent,
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
        TreeSelectModule,

        ButtonModule,
        TableModule,
        InputTextModule,
        InputNumberModule,
        DropdownModule,
        MatMenuModule,
        ChartModule,
        DialogModule,
        InputTextareaModule,
        InputSwitchModule,
        AutoFocusModule,
    ]
})
export class ProductionModule {
}
