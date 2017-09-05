import { Component, OnDestroy, OnInit, } from '@angular/core';

import { RestService } from '../../services/rest.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'

@Component({
  selector: 'inbox',
  templateUrl: 'inbox.template.html',
  styleUrls: ['component.css']
})
export class InboxComponent implements OnDestroy, OnInit {

  public nav: any;
  userId: any;
  users: any;
  public currentUser: any;

  public constructor(private restService: RestService) {
    this.nav = document.querySelector('nav.navbar');
  }

  public ngOnInit(): any {
    this.nav.className += " white-bg";
    this.userId = localStorage.getItem('userId');
    this.restService.getAccounts().subscribe(data => {
      this.users = data.data;
      this.currentUser = this.users.filter(user => user.userId == this.userId);
      console.log(this.currentUser);
    }
    )
  }


  public ngOnDestroy(): any {
    this.nav.classList.remove("white-bg");
  }

}
