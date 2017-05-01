import { Component, OnDestroy, OnInit, } from '@angular/core';

@Component({
  selector: 'hot',
  templateUrl: 'hot.template.html'
})
export class HotComponent implements OnDestroy, OnInit  {

public nav:any;

public constructor() {
  this.nav = document.querySelector('nav.navbar');
}

public ngOnInit():any {
  this.nav.className += " white-bg";
}


public ngOnDestroy():any {
  this.nav.classList.remove("white-bg");
}

}
