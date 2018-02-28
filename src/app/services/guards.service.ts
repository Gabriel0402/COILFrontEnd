import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import {RestService} from "../services/rest.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private http: Http, private rest:RestService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.rest.getAccounts().map(data=>{
            if(data.status=="error"||!localStorage.getItem('authtoken')){
                this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
                return false;
            }
            else{
                return true;
            }
        })
        // if (localStorage.getItem('authtoken')) {
        //     // logged in so return true
        //     return true;
        // }

        // not logged in so redirect to login page with the return url
        // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        // return false;
    }

}