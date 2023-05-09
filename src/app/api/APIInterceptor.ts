import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
    constructor() {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let requestUrl = req.url;
        // if the request URL have the string prefix,
        // then make the replace by the correct url

        if (requestUrl.indexOf('/api') === 0) {
            requestUrl = requestUrl.replace('/api', environment.apiUrl);
        }

        // console.log({requestUrl})

        const apiReq = req.clone({url: requestUrl});
        return next.handle(apiReq);
    }
}
