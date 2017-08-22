import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class RestService {
    constructor(private http: Http) { }
    private apiurl = "http://php.scripts.psu.edu/kqy1/coil/endpoint.php";
    getAll() {
        return this.http.get('/api/users', this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }
    
    getAccounts() {
        return this.http.get(this.apiurl+'/accounts', this.jwt())
                        .map((response: Response) => 
                            response.json());
    }


    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let authtoken = JSON.parse(localStorage.getItem('authtoken'));
        if (authtoken) {
            let headers = new Headers({ 'authorization': 'Bearer ' + authtoken });
            return new RequestOptions({ headers: headers });
        }
    }
}