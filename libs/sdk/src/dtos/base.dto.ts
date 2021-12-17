import { WithCreated, WithUpdated } from '@/interfaces/base-entity.interface';
import { Endpoint, URI, UUID } from '@/utils/types';

export type BaseDto<T extends Endpoint> = WithCreated &
  WithUpdated & {
    '@id': URI<T>;
    id: UUID;
  };
