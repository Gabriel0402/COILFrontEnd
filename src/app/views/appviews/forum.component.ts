import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'forum',
  templateUrl: 'forum.component.html',
  styleUrls: ['forum.component.css']
})
export class ForumComponent implements OnDestroy, OnInit  {

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