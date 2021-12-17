import { IBaseEntity } from '@/interfaces/base-entity.interface';
import { URI } from '@/utils/types';

export type CollectionDto<T extends IBaseEntity<any>> = {
  '@id': URI<any>;
  'hydra:member': T[];
  'hydra:totalItems': number;
};
