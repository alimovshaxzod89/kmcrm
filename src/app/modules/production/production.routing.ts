import {Route} from '@angular/router';
import {MapComponent} from 'app/modules/production/map/map.component';
import {CategoriesResolver, KomplektsResolver} from "../furniture/furniture.resolvers";
import {SehsResolver, TipsResolver} from "./production.resolvers.js";
import {ReadyInSummaryComponent} from './reports/ready-in-summary/ready-in-summary.component';
import {SehStatusComponent} from "./reports/seh-status/seh-status.component";
import {SehYuklanmaComponent} from "./reports/seh-yuklanma/seh-yuklanma.component";

export const productionRoutes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'map'
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
        // children : [
        //     {
        //         path     : '',
        //         component: CategoryListComponent,
        //         resolve  : {
        //             categories  : CategoriesResolver,
        //             units: UnitsResolver
        //         }
        //     }
        // ]
        /*children : [
            {
                path     : '',
                component: ContactsListComponent,
                resolve  : {
                    tasks    : ContactsResolver,
                    countries: ContactsCountriesResolver
                },
                children : [
                    {
                        path         : ':id',
                        component    : ContactsDetailsComponent,
                        resolve      : {
                            task     : ContactsContactResolver,
                            countries: ContactsCountriesResolver
                        },
                        canDeactivate: [CanDeactivateContactsDetails]
                    }
                ]
            }
        ]*/
    },
    {
        path: 'report/ready-in-summary',
        component: ReadyInSummaryComponent,
    },
    {
        path: 'report/seh-status',
        component: SehStatusComponent,
    },
    {
        path: 'report/seh-yuklanma',
        component: SehYuklanmaComponent,
    }
];
