import {Route} from '@angular/router';
import {MapComponent} from 'app/modules/production/map/map.component';
import {CategoriesResolver, KomplektsResolver} from "../furniture/furniture.resolvers";
import {SehsResolver, TipsResolver} from "./production.resolvers.js";
import {ReadyInSummaryComponent} from './reports/ready-in-summary/ready-in-summary.component';
import {SehStatusComponent} from "./reports/seh-status/seh-status.component";
import {SehYuklanmaComponent} from "./reports/seh-yuklanma/seh-yuklanma.component";
import {SehEarnMonthComponent} from "./reports/seh-earn-month/seh-earn-month.component";
import {TabloComponent} from "./tablo/tablo.component";

export const productionRoutes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'tablo',
    },
    {
        path: 'tablo',
        component: TabloComponent,
        resolve: {}
    },
    {
        path: 'map',
        component: MapComponent,
        resolve: {
            categories: CategoriesResolver,
            komplekts: KomplektsResolver,
            tips: TipsResolver,
            sehs: SehsResolver,
        }
    },
    {
        path: 'map/:id',
        component: MapComponent,
        resolve: {
            categories: CategoriesResolver,
            komplekts: KomplektsResolver,
            tips: TipsResolver,
            sehs: SehsResolver,
        }
    },
    {
        path: 'production',
        loadChildren: () => import('app/modules/production/production/production.module').then(m => m.ProductionModule)
    },
    {
        path: 'report',
        children: [
            {
                path: 'readiness',
                loadChildren: () => import('app/modules/production/reports/readiness/readiness.module').then(m => m.ReadinessModule)
            },
            {
                path: 'ready-in-summary',
                component: ReadyInSummaryComponent,
            },
            {
                path: 'seh-status',
                component: SehStatusComponent,
            },
            {
                path: 'seh-yuklanma',
                component: SehYuklanmaComponent,
            },
            {
                path: 'seh-earn-month',
                component: SehEarnMonthComponent,
            }
        ]
    },
    // {
    //     path: 'report/seh-earn-month',
    //     component: SehEarnMonthComponent,
    //     // children : [
    //     //     {
    //     //         path     : '',
    //     //         component: CategoryListComponent,
    //     //         resolve  : {
    //     //             categories  : CategoriesResolver,
    //     //             units: UnitsResolver
    //     //         }
    //     //     }
    //     // ]
    //     /*children : [
    //         {
    //             path     : '',
    //             component: ContactsListComponent,
    //             resolve  : {
    //                 tasks    : ContactsResolver,
    //                 countries: ContactsCountriesResolver
    //             },
    //             children : [
    //                 {
    //                     path         : ':id',
    //                     component    : ContactsDetailsComponent,
    //                     resolve      : {
    //                         task     : ContactsContactResolver,
    //                         countries: ContactsCountriesResolver
    //                     },
    //                     canDeactivate: [CanDeactivateContactsDetails]
    //                 }
    //             ]
    //         }
    //     ]*/
    // }
];
