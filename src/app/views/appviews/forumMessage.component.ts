import { Component, OnDestroy, OnInit, TemplateRef, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestService } from '../../services/rest.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { InfoService } from '../../services/info.service';

@Component({
    selector: 'forum-message',
    templateUrl: 'forumMessage.component.html',
    styleUrls: ['forum.component.css']
})

export class ForumMessageComponent implements OnDestroy, OnInit {
    @Input() forumMessages: any;
    public modalRef: BsModalRef;
    title: string;
    @Input() messageId: string;
    public rating: number;

    public ngOnInit(): any {
      this.getForumRating(this.messageId);
    }

    public ngOnDestroy(): any {}

    public constructor(private modalService: BsModalService,
                       private route: ActivatedRoute,
                       private restService: RestService,
                       private infoService: InfoService) {

    }

    public openModal(template: TemplateRef<any>,forum) {
        this.modalRef = this.modalService.show(template);
        this.title = `Re: ${forum.title}`;
        this.messageId = forum.messageId;
    }

    public getReplies(forum){
        this.restService.getForumReply(forum.messageId).subscribe(data => {
            forum.replies = data.data;
        });
    }

    private getForumRating(forumMessageId): void {
      this.restService.getForumRating(forumMessageId).subscribe(data => {
            this.rating = data.data.averageRating;
            console.log(`----- within subscription assigned rating: ${this.rating} ---------`);
      });
    }
}
