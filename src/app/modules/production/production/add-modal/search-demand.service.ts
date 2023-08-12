import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";
import {Apollo, gql} from "apollo-angular";
import {IDemandFurniture, IProduction} from "../production.types";

@Injectable({
    providedIn: 'root'
})
export class SearchDemandService {

    constructor(private _httpClient: HttpClient, private apollo: Apollo) {
    }

    // getDemands(search: string): Observable<{ id: string, doc_no: string }[]> {
    //     return this._httpClient.get<{
    //         data: { id: string, doc_no: string }[]
    //     }>(`/api/production/search-demand-by-doc_no/${search}`).pipe(
    //         map((response) => {
    //             return response.data
    //         })
    //     );
    // }

    getDemands(search: string){
        return this.apollo
            .watchQuery({
                query: gql`
                {
                    getDemands(doc_no: "${search}") {
                        id
                        doc_no
                    }
                }
            `,
            })
            .valueChanges.pipe(map(result => result.data ));
    }

    // getDemands(search)

    getDemandFurnitures(doc_no: string): Observable<IDemandFurniture[]> {
        return this._httpClient.get<{
            data: IDemandFurniture[]
        }>(`/api/production/get-demand-furnitures-by-doc_no/${doc_no}`).pipe(
            map((response) => {
                return response.data
            })
        );
    }
}
