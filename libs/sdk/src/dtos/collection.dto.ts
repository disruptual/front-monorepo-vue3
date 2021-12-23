import { URI } from '@/utils/types';
import { BaseDto } from './base.dto';

export type CollectionDto<T extends BaseDto<any>> = {
  '@id': URI<any>;
  'hydra:member': T[];
  'hydra:totalItems': number;
};
