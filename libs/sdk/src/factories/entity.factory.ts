import { BaseDto } from '@/dtos/base.dto';
import { CollectionDto } from '@/dtos/collection.dto';
import { Collection } from '@/entities/collection.entity';
import { User } from '@/entities/user.entity';
import { IBaseEntity } from '@/interfaces/base-entity.interface';
import { Constructor } from '@/utils/types';

type DtoOrCollection = BaseDto<any> | CollectionDto<any>;

export const entityMap: { [key: string]: Constructor<IBaseEntity<any>> } = {
  User: User
};

export function createEntity<T extends IBaseEntity<any>>(dto: BaseDto<any>): T;
export function createEntity<T extends IBaseEntity<any>>(
  dto: CollectionDto<any>
): Collection<T>;
export function createEntity<T extends IBaseEntity<any>>(
  dto: DtoOrCollection
): T | Collection<T> {
  if ('hydra:member' in dto) {
    const entityClass = entityMap[dto['hydra:member'][0]?.['@type']];

    return new Collection(dto, entityClass) as Collection<T>;
  }

  const entityClass = entityMap[dto['@type']];

  return new entityClass(dto) as T;
}
