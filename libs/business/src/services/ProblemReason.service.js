
import { BaseCRUDService } from './BaseCRUD.service';

export class ProblemReasonService extends BaseCRUDService {
  constructor(...args) {
    super(...args);
    this.endpoint = '/problem_reasons';
  }
}
