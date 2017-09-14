import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class RestService {
    constructor(private http: Http) { }
    private apiurl = "http://php.scripts.psu.edu/kqy1/coil/endpoint.php";

    //get requests

    getAccounts() {
        return this.http.get(this.apiurl + '/accounts', this.jwt())
            .map((response: Response) =>
                response.json());
    }

    getCourses(userId) {
        return this.http.get(this.apiurl + '/accounts/' + userId + '/courses', this.jwt()).map((response: Response) =>
            response.json());
    }

    getRatings(userId) {
        return this.http.get(this.apiurl + '/accounts/' + userId + '/ratings', this.jwt()).map((response: Response) =>
            response.json());
    }

    getForums(forumId) {
        return this.http.get(this.apiurl + '/forums/' + forumId + '/forummessages', this.jwt()).map((response: Response) =>
            response.json());
    }

    getForumReply(messageId) {
        return this.http.get(this.apiurl + '/forummessages/' + messageId + '/replies', this.jwt()).map((response: Response) =>
            response.json());
    }

    getForumRating(messageId) {
        return this.http.get(this.apiurl + '/ratings/forum/' + messageId, this.jwt()).map((response: Response) =>
            response.json());
    }

    getChatRating(chatId) {
        return this.http.get(this.apiurl + '/ratings/chat/' + chatId, this.jwt()).map((response: Response) =>
            response.json());
    }

    getCourseForums(courseId) {
        return this.http.get(this.apiurl + '/courses/' + courseId + '/forums', this.jwt()).map((response: Response) =>
            response.json());
    }

    getCourseRoster(courseId) {
        return this.http.get(this.apiurl + '/courses/' + courseId + '/rosters', this.jwt()).map((response: Response) =>
            response.json());
    }

    getChats(userId,otherId) {
        return this.http.get(this.apiurl + '/chats/' + userId+'/' + otherId, this.jwt()).map((response: Response) =>
        response.json());
    }

    //post requests
    createAccounts(user) {
        return this.http.post(this.apiurl + '/accounts', user, this.jwt()).map((response: Response) =>
            response.json());
    }

    createForum(forum) {
        return this.http.post(this.apiurl + '/forums', forum, this.jwt()).map((response: Response) =>
            response.json());
    }

    postForumMessages(forum) {
        return this.http.post(this.apiurl + '/forummessages', forum, this.jwt()).map((response: Response) =>
            response.json());
    }

    postForumMessagesReply(messageId,forum) {
        return this.http.post(this.apiurl + '/forummessages/'+messageId, forum, this.jwt()).map((response: Response) =>
            response.json());
    }

    postRatings(rating){
        return this.http.post(this.apiurl + '/ratings/forum/', rating, this.jwt()).map((response: Response) =>
        response.json());
    }

    createCourse(course){
        return this.http.post(this.apiurl + '/courses', course, this.jwt()).map((response: Response) =>
        response.json());
    }

    createChat(chatMessage) {
        return this.http.post(this.apiurl + '/chats', chatMessage, this.jwt()).map((response: Response) =>
        response.json());
    }

    //logging API
    log(logMessage){
        return this.http.post(this.apiurl + '/logs', logMessage, this.jwt()).map((response: Response) =>
        response.json());
    }

    //update password
    changePsw(password){
        return this.http.put(this.apiurl + '/accounts/password', password, this.jwt()).map((response: Response) =>
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