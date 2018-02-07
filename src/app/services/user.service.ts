import { Injectable } from "@angular/core";
@Injectable()
export class UserService {
  user={};
  public setUser(user) {
    this.user=user;
  }

  public getUser(){
     return this.user;
  }
}