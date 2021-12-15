import { Endpoint, URI, UUID } from '@/utils/types';

export interface IBaseEntity<T extends Endpoint> {
  uri: URI<T>;
  id: UUID;
  createdAt: Date;
  updatedAt: Date;
}

type WithCreated =
  | {
      created: string;
      createdAt: never;
    }
  | {
      created: never;
      createdAt: string;
    };

type WithUpdated =
  | {
      updated: string;
      updatedAt: never;
    }
  | {
      updated: never;
      updatedAt: string;
    };

export type BaseDto<T extends Endpoint> = WithCreated &
  WithUpdated & {
    '@id': URI<T>;
    id: UUID;
  };
