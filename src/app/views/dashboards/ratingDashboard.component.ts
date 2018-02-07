import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import 'rxjs/Rx';

@Component({
  selector: 'rating-dashboard',
  templateUrl: './ratingDashboard.template.html',
  styleUrls: ['./ratingCustom.component.css']
})

export class RatingDashboardComponent implements OnDestroy, OnInit {
  @Input() nickname: string;
  @Input() rate: number;
  @Input() hasRating: boolean;

  public ngOnInit(): any {
    this.roundRate();
  }

  public ngOnDestroy(): any {}

  public constructor( ) {}

  private roundRate(): void {
      if (this.rate <= 5 && this.rate > 4) {
        this.rate = 5;
      } else if (this.rate <= 4 && this.rate > 3) {
        this.rate = 4;
      } else if (this.rate <= 3 && this.rate > 2) {
        this.rate = 3;
      } else if (this.rate <= 2 && this.rate > 1) {
        this.rate = 2;
      } else if (this.rate === null) {
        this.rate = 0;
      } else {
        this.rate = 1;
      }
  }
}
