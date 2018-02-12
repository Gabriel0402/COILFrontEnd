import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { RestService } from '../../services/rest.service';
import { InfoService } from '../../services/info.service';
import 'rxjs/Rx';

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
  public forumMessage: any[];
  title: string;
  content: string;
  searchString: string;
  id: number;
  forumMessages: any;
  order: any;
  ascending: boolean;
  messagesByTime: any[];
  messagesByComment: any[];
  messagesbyCurrentUser: any[];

  public constructor(private modalService: BsModalService, private restService: RestService, private infoService: InfoService) {
    this.order = 'timestamp';
    this.ascending = true;
    this.nav = document.querySelector('nav.navbar');
    this.userId = localStorage.getItem('userId');
    this.restService.getAccounts().subscribe(data => {
      this.users = data.data;
      }
    );
    this.restService.getCourses(this.userId).subscribe(data => {
      this.courses = data.data;
      this.course = this.courses[0];
      this.restService.getCourseForums(this.course.courseId).subscribe(data => {
        this.forums = [data.data[0]];
        this.id = this.forums[0].forumId;
        this.restService.getForums(this.id).subscribe(data => {
          const result = data.data;
          this.forumMessages = result;
          this.filterByCurrentUser(result, this.userId);
          this.orderByTime(result);
          this.orderByComment(result);
        });
      });
    });
  }

  public ngOnInit(): any {
    this.nav.className += ' white-bg';
    const log = {
      component: 'what\'s hot',
      action: 'enter'
    };
    this.restService.log(log).subscribe(data => {
    });
  }


  public ngOnDestroy(): any {
    this.nav.classList.remove('white-bg');
    const log = {
      component: 'what\'s hot',
      action: 'leave'
    };
    this.restService.log(log).subscribe(data => {
    });
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  public createPost(title: string, content: string){
    const forum = {
      forumId: this.id,
      title: title,
      message: content
    };
    this.restService.postForumMessages(forum).subscribe(data => {
      this.restService.getForums(this.id).subscribe(data => {
        this.forumMessages = data.data;
      });
    });
  }

  public setForum(forum){
    this.infoService.setForum(forum);
  }

  public getLatest() {
    this.forumMessages = this.messagesByTime;
  }

  public getMostCommented() {
    this.forumMessages = this.messagesByComment;
  }

  public getMyQuestions() {
    this.forumMessages = this.messagesbyCurrentUser;
  }

  private orderByTime(result){
    this.messagesByTime = result.slice().sort(function(a, b){
      return b.timestamp - a.timestamp;
    });
  }

  private orderByComment(result){
    this.messagesByComment = result.slice().sort(function(a, b){
      return b.replies - a.replies;
    });
  }

  private filterByCurrentUser(result, userId) {
   this.messagesbyCurrentUser = result.filter(function(element) {
     return element.userId === userId;
   });
  }
}
