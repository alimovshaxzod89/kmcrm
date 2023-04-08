import {DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ExtraOptions, PreloadAllModules, RouterModule} from '@angular/router';
import {FuseModule} from '@fuse';
import {FuseConfigModule} from '@fuse/services/config';
import {FuseMockApiModule} from '@fuse/lib/mock-api';
import {CoreModule} from 'app/core/core.module';
import {appConfig} from 'app/core/config/app.config';
import {mockApiServices} from 'app/mock-api';
import {LayoutModule} from 'app/layout/layout.module';
import {AppComponent} from 'app/app.component';
import {appRoutes} from 'app/app.routing';
import {MatPaginatorIntl} from '@angular/material/paginator';
import {CustomPaginator} from 'app/custom/CustomPaginatorConfiguration';
import {FormsModule} from '@angular/forms';

import { IntlModule } from "@progress/kendo-angular-intl";
import "../../node_modules/@progress/kendo-angular-intl/locales/uz-Cyrl/all.js";
import { StoreModule } from '@ngrx/store';

const routerConfig: ExtraOptions = {
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled'
};

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),

        // Fuse, FuseConfig & FuseMockAPI
        FuseModule,
        FuseConfigModule.forRoot(appConfig),
        FuseMockApiModule.forRoot(mockApiServices),

        // Core module of your application
        CoreModule,

        // Layout module of your application
        LayoutModule,

        FormsModule,

        IntlModule,
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        {provide: MatPaginatorIntl, useValue: CustomPaginator()},
        {provide: LOCALE_ID, useValue: 'uz-Cyrl'},
        {provide: DEFAULT_CURRENCY_CODE, useValue: 'UZS'},
        {
            provide: "BASE_API_URL",
            useValue: 'http://127.0.0.1:8000/'
        }
    ],
})
export class AppModule {
}
