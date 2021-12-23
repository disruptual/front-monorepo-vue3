import { Endpoint, URI, UUID } from '@/utils/types';
import { IBaseEntity } from '@/interfaces/base-entity.interface';
import { BaseDto } from '@/dtos/base.dto';

export class BaseEntity<T extends Endpoint> implements IBaseEntity<T> {
  public uri: URI<T>;

  public id: UUID;

  public createdAt: Date;

  public updatedAt: Date;

  constructor(dto: BaseDto<T>) {
    const { '@id': uri, created, updated, createdAt, updatedAt } = dto;
    this.uri = uri;
    this.id = dto.id;
    this.createdAt = new Date(created || createdAt);
    this.updatedAt = new Date(updated || updatedAt);
  }
}
