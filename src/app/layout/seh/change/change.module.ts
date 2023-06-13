import {NgModule} from '@angular/core';
import {SharedModule} from 'app/shared/shared.module';
import {ChangeComponent} from "./change.component";
import {DropdownModule} from 'primeng/dropdown';
import {ChangeModalComponent} from './modal/modal.component';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";

@NgModule({
    declarations: [
        ChangeComponent,
        ChangeModalComponent
    ],
    imports: [
        SharedModule,
        DropdownModule,
        ButtonModule,
        DialogModule,
    ],
    exports: [
        ChangeComponent
    ]
})
export class ChangeModule {
}
