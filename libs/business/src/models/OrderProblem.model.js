import { BaseModel } from './Base.model';
import { Media } from './Media.model';
import { ProblemReason } from './ProblemReason.model';

export class OrderProblem extends BaseModel {
  static get relations() {
    return [
      {
        name: 'problemReason',
        getUri: entity => entity._problemReason,
        model: ProblemReason
      },
      {
        name: 'medias',
        getUri: entity => entity._medias,
        model: Media
      }
    ];
  }
}
