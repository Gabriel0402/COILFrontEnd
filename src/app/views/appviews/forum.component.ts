import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {RestService} from '../../services/rest.service';
import { Observable } from 'rxjs';
import 'rxjs/Rx'
import { BsModalService } from 'ngx-bootstrap/modal';
// import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import {InfoService} from '../../services/info.service';
import { DomSanitizer } from '@angular/platform-browser';

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
                    private route: ActivatedRoute,
                    private restService: RestService,
                    private infoService:InfoService,
                    private sanitizer: DomSanitizer) {
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
        for(let forumMessage of this.forumMessages){
          forumMessage.desanitizedMessage = this.sanitizer.bypassSecurityTrustHtml(forumMessage.message);
          this.restService.getForumReply(forumMessage.messageId).subscribe(data=>{
            this.replies=this.replies.concat(data.data);
          })
        }
        //console.log(this.forumMessages);
        //console.log(this.replies);
      })
      this.restService.getForumMessage(this.id).subscribe(data=>{
        this.forum=data.data;
        this.forum.messageId=this.id;
        //console.log(this.forum);
        this.forum.desanitizedMessage = this.sanitizer.bypassSecurityTrustHtml(this.forum.message);
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
    const config: ModalOptions = {class:'modal-lg', backdrop:'static'};
    this.modalRef = this.modalService.show(template, config);
    this.title="Re: "+forum.title;
    this.messageId=forum.messageId;
  }

  public createPost(title:string,content:string){
    let forum = {
      forumId: this.id,
      title: title,
      message: content,
    }

    this.restService.postForumMessagesReply(this.messageId,forum).subscribe(data=>{
      this.restService.getForumReply(this.id).subscribe(data=>{
        this.forumMessages=data.data;
        this.replies=[];
        for(let forum of this.forumMessages){
          forum.desanitizedMessage = this.sanitizer.bypassSecurityTrustHtml(forum.message);
          this.restService.getForumReply(forum.messageId).subscribe(data=>{
            this.replies=this.replies.concat(data.data);
          })
        }
        this.title="";
        this.content="";
      })
    })
  }

  public replyTo(messageId){

  }

}