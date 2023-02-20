import { Route } from '@angular/router';
import { TabloComponent } from 'app/modules/seh/tablo/tablo.component';

export const sehRoutes: Route[] = [
    {
        path      : '',
        pathMatch : 'full',
        redirectTo: 'tablo'
    },
    {
        path     : 'tablo',
        component: TabloComponent,
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
