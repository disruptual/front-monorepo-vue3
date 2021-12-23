import { BaseDto } from '@/dtos/base.dto';
import { CollectionDto } from '@/dtos/collection.dto';
import { IBaseEntity } from '@/interfaces/base-entity.interface';
import { Constructor, URI } from '@/utils/types';
import { BaseEntity } from './base.entity';

export class Collection<TEntity extends IBaseEntity<any>> {
  public uri: URI<any>;

  public data: TEntity[];

  public totalItems: number;

  constructor(dto: CollectionDto<any>, entityClass?: Constructor<TEntity>) {
    this.uri = dto['@id'];
    this.data = entityClass
      ? dto['hydra:member'].map(member => new entityClass(member))
      : [];
    this.totalItems = dto['hydra:totalItems'];
  }
}
