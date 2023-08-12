import {Component} from '@angular/core';
import {Apollo, gql} from "apollo-angular";

@Component({
    selector: 'report-readiness',
    templateUrl: './readiness.component.html',
    styleUrls: ['./readiness.component.scss']
})
export class ReadinessComponent {

    products: any[] = [];

    constructor(private apollo: Apollo) {
    }

    ngOnInit() {
        this.apollo
            .watchQuery({
                query: gql`
                {
                    customer(id: 4) {
                        name
                        phone
                    }
                }
            `,
            })
            .valueChanges.subscribe((result: any) => {
            console.log(result.data.customer);
        });
    }
}
