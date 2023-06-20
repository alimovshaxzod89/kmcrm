import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from '../../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ReadinessService {

        constructor(private http: HttpClient) { }

        // getReadiness(): Observable<any> {
        //     // return this.http.get(env.API + 'readiness');
        // }
}
