import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';


@Injectable()
export class InfoService {
    constructor() { }
    user: any;
    forum:any;
    setUser(user) {
        this.user=user;
    }
    getUser(){
        return this.user;
    }

    setForum(forum) {
        this.forum=forum;
    }

    getForum(){
        return this.forum;
    }
}