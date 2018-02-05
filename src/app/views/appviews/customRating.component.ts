import { Component, OnDestroy, OnInit, Input, Output, TemplateRef, EventEmitter } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { RestService } from '../../services/rest.service';

@Component({
  selector: 'custom-rating',
  templateUrl: './customRating.template.html',
  styleUrls: ['./customRating.component.css']
})

export class CustomRatingComponent implements OnDestroy, OnInit {
  @Input() rate: number;
  @Input() messageId: string;
  @Input () hasRatingDisabled: boolean;

  public ngOnInit(): any {}

  public ngOnDestroy(): any {}

  public constructor( private restService: RestService ) {}

  onSubmit(): void {
    this.updateRating();
    this.hasRatingDisabled = true;
  }

  private updateRating() {
    let data = {
      'forumMessageId': this.messageId,
      'rawRatingScore': this.rate
    };

    console.log(`--------------- data payload: ${JSON.stringify(data)} ------------`);

    this.restService.postRatings(this.messageId, data).subscribe();
  }

}
