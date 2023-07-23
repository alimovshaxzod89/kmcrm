import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductionComponent} from './production.component';
import {RouterModule} from "@angular/router";
import {productionRoutes} from "./production.routes";
import { AddModalComponent } from './add-modal/add-modal.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
    declarations: [
        ProductionComponent,
        AddModalComponent
    ],
    imports: [
        RouterModule.forChild(productionRoutes),
        CommonModule,
        ButtonModule
    ]
})
export class ProductionModule {
}
