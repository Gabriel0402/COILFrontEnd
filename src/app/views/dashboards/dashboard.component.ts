import { Component } from '@angular/core';
import {Router} from '@angular/router';

import {RestService} from '../../services/rest.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'

declare var jQuery:any;

@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.template.html',
  styleUrls: ['component.css']
})

export class DashboardComponent {

  users:any;
  userId:any;
  courses:any;
  course:any;
  rosters:any
  
  
  public constructor(private restService: RestService) {
    this.userId = localStorage.getItem('userId');
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
        console.log(this.rosters);
      })
    })
  }

}
