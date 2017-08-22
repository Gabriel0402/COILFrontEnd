import { Component, OnDestroy, OnInit, } from '@angular/core';

import {RestService} from '../../services/rest.service'

@Component({
  selector: 'starter',
  templateUrl: 'starter.template.html',
  styleUrls: ['component.css']
})
export class StarterViewComponent implements OnDestroy, OnInit  {

public nav:any;
users:any;

public constructor(private restService: RestService) {
  this.nav = document.querySelector('nav.navbar');
  this.restService.getAccounts().subscribe(data=>
    {
      this.users=data;}
  )
}

public ngOnInit():any {
  this.nav.className += " white-bg";
}


public ngOnDestroy():any {
  this.nav.classList.remove("white-bg");
}

}
