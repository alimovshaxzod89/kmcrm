import {Inject, Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
    constructor(@Inject('BASE_API_URL') private baseUrl: string) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let requestUrl = req.url;
        // if the request URL have the string prefix,
        // then make the replace by the correct url
        if (requestUrl.indexOf('@bu/') !== -1) {
            requestUrl = requestUrl.replace('@bu/', this.baseUrl);
        }

        const apiReq = req.clone({ url: requestUrl });
        return next.handle(apiReq);
    }
}
