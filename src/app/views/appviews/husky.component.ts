import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import 'rxjs/Rx';

import { Emotions } from '../../models/emotions.enum';
import { EmotionDetectorService } from "../../services/emotionDetector.service";

@Component({
  selector: 'husky',
  templateUrl: './husky.component.html',
  styleUrls: ['husky.component.css']

})

export class HuskyComponent implements OnDestroy, OnInit {
  @Input() userScore: number;
  protected huskyEmotions = Emotions;
  emotion;

  ngOnInit() {
    this.emotion = this.emotionDetectorService.processWith(this.userScore);
  }

  ngOnDestroy() {
    this.emotion.clear();
  }

  public constructor(private emotionDetectorService: EmotionDetectorService) {
  }
}
