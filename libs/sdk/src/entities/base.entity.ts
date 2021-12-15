import { Endpoint, URI, UUID } from '@/utils/types';
import { endpoints } from '@/utils/enums';
import { BaseDto, IBaseEntity } from '@/interfaces/base-entity.interface';

export abstract class BaseEntity<T extends Endpoint> implements IBaseEntity<T> {
  public uri!: URI<T>;

  public id!: UUID;

  public createdAt!: Date;

  public updatedAt!: Date;

  constructor(dto: BaseDto<T>) {
    const { '@id': uri, created, updated, createdAt, updatedAt } = dto;
    this.uri = uri;
    this.createdAt = new Date(created || createdAt);
    this.updatedAt = new Date(updated || updatedAt);
  }
}
