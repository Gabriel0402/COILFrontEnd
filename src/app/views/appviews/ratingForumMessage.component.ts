import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import 'rxjs/Rx';
import { RestService } from '../../services/rest.service';

@Component({
  selector: 'rating-forum-message',
  templateUrl: './ratingForumMessage.template.html',
  styleUrls: ['./ratingCustom.component.css']
})

export class RatingForumMessageComponent implements OnDestroy, OnInit {
  @Input() messageId: string;
  @Input() rate: number;

  public ngOnInit(): any {
    this.getForumRating(this.messageId);
  }

  public ngOnDestroy(): any {}

  public constructor( private restService: RestService ) {}

  private getForumRating(forumMessageId): void {
    this.restService.getForumRating(forumMessageId).subscribe(data => {
      const result = data.data.averageRating;
      this.rate = Math.round(result);
    });
  }

 public incrementHelpfulness() {
    let incrementedRate = this.rate;

    if (this.rate < 5) {
      incrementedRate++;
    }

    this.updateRating(incrementedRate);
 }

 public decrementHelpfulness() {
    let decrementedRate = this.rate;

    if (this.rate > 1) {
      decrementedRate--;
    }

    this.updateRating(decrementedRate);
 }

 private updateRating(newRate) {
   const data = {
     'forumMessageId': this.messageId,
     'rawRatingScore': newRate
   };

   this.restService.postRatings(this.messageId, data).subscribe(data =>  {
     this.getForumRating(this.messageId);
   });
 }

}
