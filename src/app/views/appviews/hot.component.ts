import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { RestService } from '../../services/rest.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'

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
  forumMessage:any;
  title:string;
  content:string;

  public constructor(private modalService: BsModalService, private restService: RestService) {
    this.nav = document.querySelector('nav.navbar');
    this.userId = '1';
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
        this.forums=data.data;
      })
    })
  }

  public ngOnInit(): any {
    this.nav.className += " white-bg";
  }


  public ngOnDestroy(): any {
    this.nav.classList.remove("white-bg");
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  public createPost(title:string,content:string){
    let forum = {
      courseId: this.course.courseId,
      title: title,
      content: content
    }
    this.restService.createForum(forum).subscribe(data=>{
      this.restService.getCourseForums(this.course.courseId).subscribe(data => {
        console.log(data);
        this.forums=data.data;
      })
    })
  }

}
