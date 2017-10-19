import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { RestService } from '../../services/rest.service';
import { InfoService } from '../../services/info.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import {SearchPipe} from "./search.pipe";
import {OrderBy} from "./order.pipe";

@Component({
  selector: 'hot',
  templateUrl: 'hot.template.html',
  styleUrls: ['component.css']
})
export class HotComponent implements OnDestroy, OnInit {

  public nav: any;
  public modalRef: BsModalRef;
  users: any;
  userId: any;
  courses: any;
  course: any;
  forums: any;
  public forumMessage:any[];
  title:string;
  content:string;
  searchString:string;
  id: number;
  forumMessages: any;
  order:any;
  ascending:boolean;

  public constructor(private modalService: BsModalService, private restService: RestService, private infoService:InfoService) {
    this.order="timestamp";
    this.ascending=true;
    this.nav = document.querySelector('nav.navbar');
    this.userId = localStorage.getItem('userId');
    this.restService.getAccounts().subscribe(data => {
      this.users = data.data;
      console.log(this.users);
    }
    )
    this.restService.getCourses(this.userId).subscribe(data => {
      this.courses = data.data;
      this.course = this.courses[0];
      this.restService.getCourseForums(this.course.courseId).subscribe(data => {
        console.log(data);
        this.forums=[data.data[0]];
        this.id=this.forums[0].forumId;
        this.restService.getForums(this.id).subscribe(data=>{
          this.forumMessages=data.data;
          console.log(this.forumMessages);
        })
      })
    })
  }

  public ngOnInit(): any {
    this.nav.className += " white-bg";
    let log={
      component:"what's hot",
      action:"enter"
    }
    this.restService.log(log).subscribe(data=>{
      console.log(data);
    })
  }


  public ngOnDestroy(): any {
    this.nav.classList.remove("white-bg");
    let log={
      component:"what's hot",
      action:"leave"
    }
    this.restService.log(log).subscribe(data=>{
      console.log(data);
    })
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  // public createPost(title:string,content:string){
  //   let forum = {
  //     courseId: this.course.courseId,
  //     title: title
  //   }
  //   this.restService.createForum(forum).subscribe(data=>{
  //     this.restService.getCourseForums(this.course.courseId).subscribe(data => {
  //       console.log(data);
  //       this.forums=data.data;
  //     })
  //   })
  // }
  public createPost(title:string,content:string){
    let forum = {
      forumId: this.id,
      title: title,
      message: content
    }
    this.restService.postForumMessages(forum).subscribe(data=>{
      this.restService.getForums(this.id).subscribe(data=>{
        this.forumMessages=data.data;
        console.log(this.forumMessages);
      })
    })
  }

  public setForum(forum){
    this.infoService.setForum(forum);
  }

  public orderByTime(){
    this.forumMessages=this.forumMessages.sort(function(a,b){
      return b.timestamp-a.timestamp;
    })
  }

  public orderByComment(){
    this.forumMessages=this.forumMessages.sort(function(a,b){
      return b.replies-a.replies;
    })
  }

}
