import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }
    private apiurl = "http://php.scripts.psu.edu/kqy1/coil/endpoint.php";
    login(username: string, password: string) {
        return this.http.post(this.apiurl+'/auth/login', JSON.stringify({ userId: username, password: password }))
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let res = response.json();
                if (res && res.data) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('authtoken', JSON.stringify(res.data.token));
                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('authtoken');
    }
}