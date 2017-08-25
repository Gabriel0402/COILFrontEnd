import { Component, OnDestroy, OnInit, } from '@angular/core';

import {RestService} from '../../services/rest.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'

@Component({
  selector: 'starter',
  templateUrl: 'starter.template.html',
  styleUrls: ['component.css']
})
export class StarterViewComponent implements OnDestroy, OnInit  {

public nav:any;
users:any;
userId:any;
courses:any;
course:any;
rosters:any


public constructor(private restService: RestService) {
  this.userId='1';
  this.nav = document.querySelector('nav.navbar');
  this.restService.getAccounts().subscribe(data=>
    {
      this.users=data.data;
      console.log(this.users);
    }
  )
  this.restService.getCourses(this.userId).subscribe(data=>{
    this.courses=data.data;
    this.course=this.courses[0];
    this.restService.getCourseRoster(this.course.courseId).subscribe(data=>{ 
      this.rosters=data.data;
      let Observables = [];
      for(let user of this.rosters){
        Observables.push(this.restService.getRatings(user.userId));
      }
      Observable.forkJoin(Observables).subscribe(result=>{
        console.log(result);
      })
    })
  })
}

public ngOnInit():any {
  this.nav.className += " white-bg";
}


public ngOnDestroy():any {
  this.nav.classList.remove("white-bg");
}

}
