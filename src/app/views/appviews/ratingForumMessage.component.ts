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
  isInitialRate: boolean;

  public ngOnInit(): any {
    this.getForumRating(this.messageId);
  }

  public ngOnDestroy(): any {}

  public constructor( private restService: RestService ) {}


  private getForumRating(forumMessageId: string): void {
    this.restService.getForumRating(forumMessageId).subscribe(data => {
      const result = data.data.averageRating;
      this.checkIsInitialRate(result);
      this.rate = Math.round(result);
    });
  }

  private checkIsInitialRate(rate: number) {
    this.isInitialRate = !rate;
  }

  public onSubmit() {
    this.updateRating(this.rate);
    this.isInitialRate = false;
  }

  public incrementHelpfulness() {
    let incrementedRate = this.rate;

    (this.rate >= 5) ? (incrementedRate = 5) : incrementedRate++;

    this.updateRating(incrementedRate);
  }

  public decrementHelpfulness() {
    let decrementedRate = this.rate;

    (this.rate <= 1) ? (decrementedRate = 0) : decrementedRate-- ;

    this.updateRating(decrementedRate);
  }

  private updateRating(newRate: number) {
    const data = {
      'forumMessageId': this.messageId,
      'rawRatingScore': newRate
    };

    this.restService.postRatings(this.messageId, data).subscribe(data =>  {
      this.getForumRating(this.messageId);
    });
  }

}
