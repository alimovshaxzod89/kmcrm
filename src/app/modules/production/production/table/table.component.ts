import { Component } from '@angular/core';

@Component({
  selector: 'production-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
//   Table's variables
    products:object[] = [];
    cols: object[] = [];

    ngOnInit() {
        this.products = [
            {
                id: '1000',
                N:'1',
                doc_no:'123123',
                mebel:'Kreslo',
                start:'13.03.2024',
                finish:'13.04.2024',
                soni:'8',
                izoh:'ishlab chiqarish',
                amallar:'yaqin kunlarda',
            },
        ]

        this.cols = [
            { field: 'N', header: 'N#' },
            { field: 'doc_no', header: 'Doc_no' },
            { field: 'mebel', header: 'Mebel' },
            { field: 'start', header: 'Start' },
            { field: 'finish', header: 'Finish' },
            { field: 'soni', header: 'Soni' },
            { field: 'izoh', header: 'Izoh' },
            { field: 'amallar', header: 'Amallar' },
        ];
    }

}
