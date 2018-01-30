import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import { RestService } from '../../services/rest.service';
import 'rxjs/Rx';

import { HuskyEmotions } from './huskyEmotions';

@Component({
  selector: 'husky',
  templateUrl: './husky.component.html',
  styleUrls: ['husky.component.css']

})

export class HuskyComponent implements OnDestroy, OnInit {
  @Input() userScore:any;
  huskyEmotions;
  emotion;

  ngOnInit() {
    this.setEmotion();
  }
  ngOnDestroy() {}

  public constructor(private restService: RestService) {
    this.huskyEmotions = HuskyEmotions;
  }

  public setEmotion(): any {
    this.userScore === null ? this.emotion = this.huskyEmotions.HAPPIEST : this.emotion = this.huskyEmotions.DEAD ;
  }
}
