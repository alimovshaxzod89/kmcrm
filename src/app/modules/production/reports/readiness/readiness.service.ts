import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from '../../../../../environments/environment';
import {Apollo} from "apollo-angular";

@Injectable({
    providedIn: 'root'
})
export class ReadinessService {

        constructor(private http: HttpClient, private apollo: Apollo) { }

        // getReadiness(): Observable<any> {
        //     // return this.http.get(env.API + 'readiness');
        // }
}
