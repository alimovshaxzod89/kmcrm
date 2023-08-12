import {Component, OnInit, signal, WritableSignal} from '@angular/core';
import {SearchDemandService} from "./search-demand.service";
import {Apollo, gql} from "apollo-angular";
import {IDemandFurniture, IProduction} from "../production.types";
import {formatDate} from '@angular/common';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

interface IProductionForm extends IDemandFurniture {
    productionAmount?: number | null,
    productionDescription?: string | null,
}

@Component({
    selector: 'production-add-modal',
    templateUrl: './add-modal.component.html',
    styleUrls: ['./add-modal.component.scss'],
})
export class AddModalComponent implements OnInit {

    // Modal
    visible: boolean = true;

    showDialog() {
        this.visible = true;
    }

    doc_no: WritableSignal<string> = signal('');

    suggestions: string[] = [];

    search(event: AutoCompleteCompleteEvent) {

        if (event.query.length < 3) return;

        this.getDemands(event.query);
    };

    // Calendar
    start_at: Date | undefined;
    finish_at: Date | undefined;

    // Table's variables
    demandFurnitures: IProductionForm[] = [];

    constructor(private _service: SearchDemandService, private apollo: Apollo) {

    }

    ngOnInit() {
        this.start_at = new Date('2023-08-03')
        this.finish_at = new Date('2023-08-20')
    }

    getDemands(search: string) {

        this._service.getDemands(search)
            .subscribe((data: { getDemands: { id: number | string, doc_no: string }[] }) => {
                this.suggestions = data.getDemands.map(item => item.doc_no);
            })
    }


    selectDemand(doc_no: string) {
        this._service.getDemandFurnitures(doc_no).subscribe((data) => {

            this.demandFurnitures = data.map(item => {
                return {
                    ...item,
                    productionAmount: null,
                    productionDescription: null,
                }
            })
        })
    }

    submit() {

        if (!this.start_at || !this.finish_at) {
            alert('oldin muddatlarni to\'ldiring');
            return
        }

        const productions: IProduction[] = this.demandFurnitures.filter(item => item.productionAmount > 0)
            .map(item => {
                return {
                    map_id: item.map.id,
                    demand_furniture_id: item.id,
                    amount: item.productionAmount,
                    description: item.productionDescription,
                    start_at: formatDate(this.start_at, 'yyyy-MM-dd HH:mm:ss', 'en-US'),
                    finish_at: formatDate(this.finish_at, 'yyyy-MM-dd HH:mm:ss', 'en-US'),
                }
            });

        this.createProductions(productions);
    }

    createProductions(productions: IProduction[]): void {
        const mutationPromises = productions.map((production) => {
            return this.apollo.mutate({
                mutation: gql`
          mutation CreateProduction($input: CreateProductionInput!) {
            createProduction(input: $input) {
              id
              map_id
              amount
              start_at
              finish_at
            }
          }
        `,
                variables: {
                    input: production,
                },
            }).toPromise();
        });

        Promise.all(mutationPromises)
            .then((results) => {
                // Handle success
                console.log('Multiple productions created:', results);

                this.visible = false;
            })
            .catch((error) => {
                // Handle error
                console.error('Error creating productions:', error);
                alert('Xatolik');
            });
    }
}


