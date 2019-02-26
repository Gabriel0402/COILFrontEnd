import { Component, OnDestroy, OnInit, } from '@angular/core';

import { RestService } from '../../services/rest.service';
import { NgStyle } from '@angular/common';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'starter',
  templateUrl: 'starter.template.html',
  styleUrls: ['component.css']
})
export class StarterViewComponent implements OnDestroy, OnInit {

  public nav: any;
  users: any;
  userId: any;
  courses: any;
  course: any;
  rosters: any;
  leaders: any;
  leaderboardIsActive: boolean;
  password: any;
  public currentUser: any;
  public alerts: any = [];
  public helpAlerts: any = [];
  rate: number;
  max: number;


  public constructor(private restService: RestService, private userService: UserService) {

    this.nav = document.querySelector('nav.navbar');

    function switchUser(userId) {
      this.userId = userId;
      this.currentUser = this.users.filter(user => user.userId == this.userId);
    }

  }

  public ngOnInit(): any {
    this.rate = 3;
    this.max = 5;
    this.userId = localStorage.getItem('userId');
    this.nav.className += ' white-bg';
    this.restService.getAccounts().subscribe(data => {
        this.users = data.data;
        this.currentUser = this.users.filter(user => user.userId == this.userId);
        const log = {
          component: 'start view',
          action: 'enter',
          nickname:this.currentUser[0].nickname,
          averageScore:this.currentUser[0].averageScore,
          averageRating:this.currentUser[0].averageRating,
          needHelp:this.currentUser[0].needHelp
        };
        this.restService.log(log).subscribe(data => {});
      }
    );

    this.restService.getCourses(this.userId).subscribe(data => {
      this.courses = data.data;
      this.course = this.courses[0];
      this.restService.getCourseRoster(this.course.courseId).subscribe(data => {
        this.rosters = data.data;
        this.activateLeaderboard(this.rosters);
        this.setLeaders(this.rosters);
      });
    });   
  }

  public ngOnDestroy(): any {
    this.nav.classList.remove('white-bg');
    const log = {
      component: 'start view',
      action: 'leave',
      nickname:this.currentUser[0].nickname,
      averageScore:this.currentUser[0].averageScore,
      averageRating:this.currentUser[0].averageRating,
      needHelp:this.currentUser[0].needHelp
    };
    this.restService.log(log).subscribe(data => {});
  }

  private setLeaders(collection): any {
    this.sortRoster(collection);
    this.leaders = collection.slice(0, 5);
  }

  private sortRoster(collection): any {
    collection.sort((a, b) => {
      return b.averageScore - a.averageScore;
    });
  }

  private activateLeaderboard(collection): any {
    const usersMissingAverageScore = collection.filter(e => { return e.averageScore === null; });

    this.leaderboardIsActive = !(usersMissingAverageScore.length >= (this.rosters.length / 2));
  }

  activateHelp() {
    this.alerts = [];
    const help = {
      help: 'true'
    };
    this.restService.activateHelp(help).subscribe(data => {
      this.helpAlerts = [{
        type: 'success',
        msg: `Someone will come to help you`,
        timeout: 3000
      }];
      this.restService.getCourseRoster(this.course.courseId).subscribe(data => {
        this.rosters = data.data;
        this.currentUser = this.rosters.filter(user => user.userId == this.userId);
      });
    });
  }

  deactivateHelp() {
    this.alerts = [];
    this.restService.deactivateHelp().subscribe(data => {
      this.helpAlerts = [{
        type: 'success',
        msg: `Glad you've solved your problem`,
        timeout: 3000
      }];
      this.restService.getCourseRoster(this.course.courseId).subscribe(data => {
        this.rosters = data.data;
        this.currentUser = this.rosters.filter(user => user.userId == this.userId);
      });
    });
  }


}
