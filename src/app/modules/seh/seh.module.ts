import {NgModule} from '@angular/core';
import {TabloComponent} from './tablo/tablo.component';
import {RouterModule} from "@angular/router";
import {sehRoutes} from "./seh.routing";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {TodoTableComponent} from './tablo/todo-table/todo-table.component';
import {MatButtonModule} from "@angular/material/button";


@NgModule({
    declarations: [
        TabloComponent,
        TodoTableComponent
    ],
    imports: [
        RouterModule.forChild(sehRoutes),
        MatTableModule,
        MatIconModule,
        MatCheckboxModule,
        MatButtonModule
    ],
})
export class SehModule {
}
