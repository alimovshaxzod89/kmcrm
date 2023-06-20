import {NgModule} from '@angular/core';
import {ReadinessComponent} from './readiness.component';
import {readinessRoutes} from './readiness.routes';
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../../../shared/shared.module";
import {TableModule} from "primeng/table";

@NgModule({
    declarations: [
        ReadinessComponent
    ],
    imports: [
        RouterModule.forChild(readinessRoutes),
        SharedModule,
        TableModule
    ]
})
export class ReadinessModule {

}
