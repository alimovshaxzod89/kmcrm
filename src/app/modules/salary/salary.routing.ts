import {Route} from '@angular/router';
import { DailyComponent } from './daily/daily.component';

export const salaryRoutes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'map'
    },
    {
        path: 'daily',
        component: DailyComponent,
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
    }
];
