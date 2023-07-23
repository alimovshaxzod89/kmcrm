import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TabloComponent} from './tablo.component';
import {TodoComponent} from './todo/todo.component';
import {DoneComponent} from './done/done.component';
import {TableModule} from "primeng/table";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {RouterModule} from "@angular/router";
import {tabloRoutes} from "./tablo.routes";

@NgModule({
    declarations: [
        TabloComponent,
        TodoComponent,
        DoneComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(tabloRoutes),
        TableModule,
        MatIconModule,
        MatButtonModule,
    ]
})
export class TabloModule {
}
