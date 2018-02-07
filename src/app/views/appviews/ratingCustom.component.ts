import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import 'rxjs/Rx';
import { RestService } from '../../services/rest.service';

@Component({
  selector: 'rating-custom',
  templateUrl: './ratingCustom.template.html',
  styleUrls: ['./ratingCustom.component.css']
})

export class RatingCustomComponent implements OnDestroy, OnInit {
  @Input() messageId: string;
  @Input() rate: number;

  public ngOnInit(): any {
    this.getForumRating(this.messageId);
  }

  public ngOnDestroy(): any {}

  public constructor( private restService: RestService ) {}

  private getForumRating(forumMessageId): void {
    this.restService.getForumRating(forumMessageId).subscribe(data => {
      let result = data.data.averageRating;

      if (result <= 5 && result > 4) {
        this.rate = 5;
      } else if (result <= 4 && result > 3) {
        this.rate = 4;
      } else if (result <= 3 && result > 2) {
        this.rate = 3;
      } else if (result <= 2 && result > 1) {
        this.rate = 2;
      } else if (result === null) {
        this.rate = 0;
      } else {
        this.rate = 1;
      }

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
   let data = {
     'forumMessageId': this.messageId,
     'rawRatingScore': newRate
   };

   this.restService.postRatings(this.messageId, data).subscribe(data =>  {
     this.getForumRating(this.messageId);
   });
 }

}
