import { BaseDto } from '@/dtos/base.dto';
import { IBaseEntity } from '@/interfaces/base-entity.interface';
import { IHttp } from '@/interfaces/http.interface';

export type RepositoryOptions<
  TModel extends IBaseEntity<any>,
  TDto extends BaseDto<any>
> = { http: IHttp; modelClass: TModel; dtoClass: TDto };

export abstract class BaseRepository<
  TModel extends IBaseEntity<any>,
  TDto extends BaseDto<any>
> {
  private modelClass: TModel;

  private dtoClass: TDto;

  private http: IHttp;

  constructor({ http, modelClass, dtoClass }: RepositoryOptions<TModel, TDto>) {
    this.modelClass = modelClass;
    this.dtoClass = dtoClass;
    this.http = http;
  }

  findById() {}
}
