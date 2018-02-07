import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import 'rxjs/Rx';

@Component({
  selector: 'rating-display',
  templateUrl: './ratingDisplay.template.html',
  styleUrls: ['./ratingCustom.component.css']
})

export class RatingDisplayComponent implements OnDestroy, OnInit {
  @Input() nickname: string;
  @Input() rate: number;
  @Input() hasRating: boolean;

  public ngOnInit(): any {
    this.rate = this.roundRate();
  }

  public ngOnDestroy(): any {}

  public constructor( ) {}

  private roundRate(): number {
      return Math.round(this.rate);
  }
}
