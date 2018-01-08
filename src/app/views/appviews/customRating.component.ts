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
  @Input() rate:number;
  @Input() messageId:string;
  // @Output() rateChange:EventEmitter<number> = new EventEmitter();

  public ngOnInit(): any {}

  public ngOnDestroy(): any {}

  public constructor( private restService:RestService ){}

//TODO: need to verify if payload for POST request is accurate
  private updateForumMessageRating(newRate) {
    this.restService.postRatings(this.messageId,newRate).subscribe();
  }
}
