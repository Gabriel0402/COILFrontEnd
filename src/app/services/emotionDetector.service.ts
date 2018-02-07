import { HappiestEmotionCalculator } from '../models/happiestEmotionCalculator.model';
import { HappyEmotionCalculator } from "../models/happyEmotionCalculator.model";
import { NeutralEmotionCalculator } from "../models/neutralEmotionCalculator.model";
import { SadEmotionCalculator } from '../models/sadEmotionCalculator.model';
import { DeadEmotionCalculator } from '../models/deadEmotionCalculator.model';
import { EmotionCalculator } from "../models/emotionCalculator.model";
import { Injectable } from "@angular/core";


@Injectable()
export class EmotionDetectorService {
  protected emotionCalculators: Array<EmotionCalculator> = [
    new HappiestEmotionCalculator(0.9, 1.1),
    new HappyEmotionCalculator(0.8, 0.9),
    new NeutralEmotionCalculator(0.7, 0.8),
    new SadEmotionCalculator(0.6, 0.7),
    new DeadEmotionCalculator(0, 0.6)
  ];

  public processWith(userScore): number {
    for ( const emotionCalculator of this.emotionCalculators ) {
      const emotion = emotionCalculator.setEmotionBasedOnUserScoreOf(userScore);

      if ( emotion !== undefined ) {
        return emotion;
      }
    }
  }
}
