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

import {EffectsModule} from "@ngrx/effects";
import {MapEffects} from "./modules/production/map/store/map.effects";
import {StoreModule} from "@ngrx/store";
import {mapReducer} from "./modules/production/map/store/map.reducer";
import {stepsReducer} from "./modules/production/map/store/steps.reducer";
import {unitsReducer} from "./modules/production/map/store/units.reducer";
import {StepsEffects} from "./modules/production/map/store/steps.effects";

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

        StoreModule.forRoot({cost: mapReducer, steps: stepsReducer, units: unitsReducer}),
        EffectsModule.forRoot(MapEffects, StepsEffects),

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
            // useValue: 'http://127.0.0.1:8000/',
            useValue: 'http://192.168.1.2:8000/',
        }
    ],
})
export class AppModule {
}
