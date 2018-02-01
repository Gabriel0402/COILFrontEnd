import { Emotions } from "./emotions.enum";

export abstract class EmotionCalculator {
  protected minWeight: number;
  protected maxWeight: number;
  emotions = Emotions;

  public constructor (minWeight: number, maxWeight: number) {
    this.minWeight = minWeight;
    this.maxWeight = maxWeight;
  }

  abstract setEmotionBasedOnUserScoreOf(userScore: number)

  public isWithinRangeBasedOn(userScore: number) {
    return (this.minWeight <= userScore) && (userScore < this.maxWeight);
  }

}


