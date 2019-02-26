import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {RestService} from '../../services/rest.service';
import { Observable } from 'rxjs';
import 'rxjs/Rx'
import { BsModalService } from 'ngx-bootstrap/modal';
// import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { BsModalRef } from 'ngx-bootstrap/modal';
import {InfoService} from '../../services/info.service';

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
  forumMsg:any;
  public modalRef: BsModalRef;
  forum:any;
  title:string;
  content:string;
  messageId:string;
  replies:any[];

  public constructor(private modalService: BsModalService,private route: ActivatedRoute,private restService: RestService, private infoService:InfoService) {
    this.nav = document.querySelector('nav.navbar');
    
  }

  public ngOnInit(): any {
    this.nav.className += " white-bg";
    this.title="";
    this.content="";
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
      
      this.restService.getForumReply(this.id).subscribe(data=>{
        this.forumMessages=data.data;
        this.replies=[];
        for(let forum of this.forumMessages){
          this.restService.getForumReply(forum.messageId).subscribe(data=>{
            this.replies=this.replies.concat(data.data);
          })
        }
        //console.log(this.forumMessages);
      })
      this.restService.getForumMessage(this.id).subscribe(data=>{
        this.forum=data.data;
        this.forum.messageId=this.id;
        //console.log(this.forum);
      })
    });
    let log={
      component:"forum",
      action:"enter"
    }
    this.restService.log(log).subscribe(data=>{
      //console.log(data);
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
      //console.log(data);
    })
  }

  public openModal(template: TemplateRef<any>,forum) {
    this.modalRef = this.modalService.show(template);
    this.title="Re: "+forum.title;
    this.messageId=forum.messageId;
  }

  public createPost(title:string,content:string){
    let forum = {
      forumId: this.id,
      title: title,
      message: content
    }
    this.restService.postForumMessagesReply(this.messageId,forum).subscribe(data=>{
      this.restService.getForumReply(this.id).subscribe(data=>{
        this.forumMessages=data.data;
        this.replies=[];
        for(let forum of this.forumMessages){
          this.restService.getForumReply(forum.messageId).subscribe(data=>{
            this.replies=this.replies.concat(data.data);
          })
        }
        //console.log(this.forumMessages);
        this.title="";
        this.content="";
      })
    })
  }

  public replyTo(messageId){

  }

}