import { Endpoint, URI, UUID } from '@/utils/types';

export interface IBaseEntity<T extends Endpoint> {
  uri: URI<T>;
  id: UUID;
  createdAt: Date;
  updatedAt: Date;
}

export type WithCreated =
  | {
      created: string;
      createdAt: never;
    }
  | {
      created: never;
      createdAt: string;
    };

export type WithUpdated =
  | {
      updated: string;
      updatedAt: never;
    }
  | {
      updated: never;
      updatedAt: string;
    };
