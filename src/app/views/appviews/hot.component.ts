import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { RestService } from '../../services/rest.service';
import { InfoService } from '../../services/info.service';
import 'rxjs/Rx';
import { UserService } from '../../services/user.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'hot',
  templateUrl: 'hot.template.html',
  styleUrls: ['component.css', 'hot.component.css']
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
  currentUser:any;
  editorForm: FormGroup;

public editorConfig = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      //['blockquote', 'code-block'],
  
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction
  
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
  
      ['clean'],                                         // remove formatting button
  
      //['link', 'image', 'video']                         // link and image, video
    ]
  };

  public constructor(private modalService: BsModalService,
                      private restService: RestService,
                      private infoService: InfoService,
                      private userService: UserService) {
    this.order = 'timestamp';
    this.ascending = true;
    this.nav = document.querySelector('nav.navbar');
    this.userId = localStorage.getItem('userId');
    this.restService.getAccounts().subscribe(data => {
      this.users = data.data;
      this.currentUser = this.users.filter(user => user.userId == this.userId);
      const log = {
        component: 'what\'s hot',
        action: 'enter',
        nickname:this.currentUser[0].nickname,
        averageScore:this.currentUser[0].averageScore,
        averageRating:this.currentUser[0].averageRating,
        needHelp:this.currentUser[0].needHelp
      };
      this.restService.log(log).subscribe(data => {
        });
      }
    );
    this.restService.getCourses(this.userId).subscribe(data => {
      this.courses = data.data;
      this.course = this.courses[0];
      this.restService.getCourseForums(this.course.courseId).subscribe(data => {
        this.forums = [data.data[0]];
        this.id = this.forums[0].forumId;
        this.restService.getForums(this.id).subscribe(data => {
          this.postFetchingForum(data);
        });
      });
    });
  }

  public ngOnInit(): any {
    this.nav.className += ' white-bg';
    this.editorForm = new FormGroup({
      'editor': new FormControl(null)
    });
  }

  public ngOnDestroy(): any {
    this.nav.classList.remove('white-bg');
    const log = {
      component: 'what\'s hot',
      action: 'leave',
      nickname:this.currentUser[0].nickname,
      averageScore:this.currentUser[0].averageScore,
      averageRating:this.currentUser[0].averageRating,
      needHelp:this.currentUser[0].needHelp
    };
    this.restService.log(log).subscribe(data => {
    });
  }

  public openModal(template: TemplateRef<any>) {
    // Martin added this to control the size of the modal dialog
    // for the quill editor
    const config: ModalOptions = {class:'modal-lg', backdrop:'static'};
    this.modalRef = this.modalService.show(template, config);
  }

  private postFetchingForum(data) {
    const result = data.data;
    this.forumMessages = result;
    this.shortPlainTextMessage(this.forumMessages);
    this.filterByCurrentUser(result, this.userId);
    this.orderByTime(result);
    this.orderByComment(result);
  }

  public createPost(title: string, content: string){
    const forum = {
      forumId: this.id,
      title: title,
      message: content
    };
    this.restService.postForumMessages(forum).subscribe(data => {
      this.restService.getForums(this.id).subscribe(data => {
        this.postFetchingForum(data);
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

  private shortPlainTextMessage(messages:any) {
    messages.forEach(element => {
      var text = element.message ? String(element.message).replace(/<[^>]+>/gm, '') : '';
      element.shortMessage = text.length > 56? text.substring(0, 56) + '...':text;
    });
  }
}
