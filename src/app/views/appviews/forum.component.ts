import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {RestService} from '../../services/rest.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

@Component({
  selector: 'forum',
  templateUrl: 'forum.component.html',
  styleUrls: ['forum.component.css']
})
export class ForumComponent implements OnDestroy, OnInit {

  public nav: any;
  id: number;
  private sub: any;
  forumMessages: any;
  public modalRef: BsModalRef;

  public constructor(private modalService: BsModalService,private route: ActivatedRoute,private restService: RestService) {
    this.nav = document.querySelector('nav.navbar');
  }

  public ngOnInit(): any {
    this.nav.className += " white-bg";
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
      this.restService.getForumReply(this.id).subscribe(data=>{
        this.forumMessages=data.data;
        console.log(this.forumMessages);
      })
    });
    let log={
      component:"forum",
      action:"enter"
    }
    this.restService.log(log).subscribe(data=>{
      console.log(data);
    })
  }


  public ngOnDestroy(): any {
    this.nav.classList.remove("white-bg");
    this.sub.unsubscribe();
    let log={
      component:"inbox",
      action:"leave"
    }
    this.restService.log(log).subscribe(data=>{
      console.log(data);
    })
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  public createPost(title:string,content:string){
    let forum = {
      forumId: this.id,
      title: title,
      message: content
    }
    this.restService.postForumMessagesReply(this.id,forum).subscribe(data=>{
      this.restService.getForumReply(this.id).subscribe(data=>{
        this.forumMessages=data.data;
        console.log(this.forumMessages);
      })
    })
  }

}