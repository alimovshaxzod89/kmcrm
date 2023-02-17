import {NgModule} from '@angular/core';
import {UnitComponent} from './unit.component';
import {Route, RouterModule} from "@angular/router";
import { TableComponent } from './table/table.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {DatePipe, NgIf} from "@angular/common";

const unitRoutes: Route[] = [
    {
        path: '',
        component: UnitComponent
    }
];


@NgModule({
    declarations: [
        UnitComponent,
        TableComponent
    ],
    imports: [
        RouterModule.forChild(unitRoutes),
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        DatePipe,
        NgIf
    ]
})
export class UnitModule {
}
