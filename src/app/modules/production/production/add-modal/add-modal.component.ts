import { Component, OnInit} from '@angular/core';


interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}
@Component({
  selector: 'production-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss'],
})


export class AddModalComponent implements OnInit{

    // Modal
    visible: boolean = false;
    showDialog() {
        this.visible = true;
    }

    //Filter
    countries: any[] | undefined;

    filteredCountries: any[] | undefined;

    doc_no: any;

    suggestions: any[] | undefined;

    search(event: AutoCompleteCompleteEvent) {
        this.suggestions = [...Array(10).keys()].map(item => event.query + '-' + item);
    };



    // Calendar
    Start_at: Date | undefined;
    Finish_at:Date | undefined;

    // Table's variables
    products: object[] = [];
    cols:object[] = [];

    ngOnInit() {

        this.countries = [
            {
                "name": "Afghanistan",
                "code": "AF"
            },
            {
                "name":'Uzbekistan',
                "code":"UZB",
            }
        ]

        this.products = [
            {
                id: '1000',
                code: 'f230fh0g3',
                name: 'Bamboo Watch',
                description: 'Product Description',
                image: 'bamboo-watch.jpg',
                price: 65,
                category: 'Accessories',
                quantity: 24,
                inventoryStatus: 'INSTOCK',
                rating: 5
            },
        ]
        this.cols = [
            { field: 'mebel', header: 'Mebel' },
            { field: 'buyurtma', header: 'Buyurtmaning Izohi' },
            { field: 'rang', header: 'Rang,Derevo' },
            { field: 'soni', header: 'Soni' },
            { field: 'nechta', header: 'Nechta chiqaramiz' },
            { field: 'message', header: 'izoh' },
        ]



    }

    // Button - Qo'shish
    addElements() {
        this.visible = true;
    }


    filterCountry(event: AutoCompleteCompleteEvent) {
        let filtered: any[] = [];
        let query = event.query;

        for (let i = 0; i < (this.countries as any[]).length; i++) {
            let country = (this.countries as any[])[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }

        this.filteredCountries = filtered;
    }


}


