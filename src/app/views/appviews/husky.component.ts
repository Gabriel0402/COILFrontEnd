import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import 'rxjs/Rx';

import { HuskyEmotions } from './huskyEmotions';

@Component({
  selector: 'husky',
  templateUrl: './husky.component.html',
  styleUrls: ['husky.component.css']

})

export class HuskyComponent implements OnDestroy, OnInit {
  @Input() userScore: number;
  huskyEmotions;
  emotion;

  ngOnInit() {
    this.setEmotion();
  }

  ngOnDestroy() {}

  public constructor() {
    this.huskyEmotions = HuskyEmotions;
  }

  private setEmotion(): any {
    if ( this.isHappiest() ) {
      this.emotion = this.huskyEmotions.HAPPIEST;
    } else if ( this.isHappy() ) {
      this.emotion = this.huskyEmotions.HAPPY;
    } else if ( this.isNeutral() ) {
      this.emotion = this.huskyEmotions.NEUTRAL;
    } else if ( this.isSad() ) {
      this.emotion = this.huskyEmotions.SAD;
    } else if ( this.isDead() ) {
      this.emotion = this.huskyEmotions.DEAD;
    } else {
     // TODO: Implement exception handling and determine default behavior for when score is null.
     console.log("There was an error setting the husky's emotion.");
    }
  }

  private isHappiest() {
    return this.userScoreWithinRangeOf(0.9, 1.1);
  }

  private isHappy() {
    return this.userScoreWithinRangeOf(0.8, 0.9);
  }

  private isNeutral() {
    return this.userScoreWithinRangeOf(0.7, 0.8);
  }

  private isSad() {
    return this.userScoreWithinRangeOf(0.6, 0.7);
  }

  private isDead() {
    return this.userScoreWithinRangeOf(0, 0.6);
  }

  private userScoreWithinRangeOf(minScore: number, maxScore: number) {
    return (minScore <= this.userScore) && (this.userScore < maxScore);
  }
}
