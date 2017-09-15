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
rosters:any;
passwordd:any;
public currentUser:any;
public alerts: any = [];


public constructor(private restService: RestService) {
  
  this.nav = document.querySelector('nav.navbar');
  
  function switchUser(userId){
    this.userId=userId;
    this.currentUser=this.users.filter(user=>user.userId==this.userId);
  }

}

public ngOnInit():any {
  this.userId=localStorage.getItem('userId');
  this.nav.className += " white-bg";
  this.restService.getAccounts().subscribe(data=>
    {
      this.users=data.data;
      this.currentUser=this.users.filter(user=>user.userId==this.userId);
      console.log(this.currentUser);
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

  let log={
    component:"start view",
    action:"enter"
  }
  this.restService.log(log).subscribe(data=>{
    console.log(data);
  })
}


public ngOnDestroy():any {
  this.nav.classList.remove("white-bg");
  let log={
    component:"start view",
    action:"leave"
  }
  this.restService.log(log).subscribe(data=>{
    console.log(data);
  })
}

updatePwd(password){
  let psw={
    password:password
  }
  this.restService.changePsw(psw).subscribe(data=>{
    this.alerts.push({
      type: 'success',
      msg: `Successfully updated your password`,
      timeout: 3000
    });
  })
}

}
