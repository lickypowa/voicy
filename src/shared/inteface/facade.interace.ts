import { Observable } from 'rxjs';
import { BaseFilter } from 'src/domain/entity/base.filter';

export interface IFacade<T> {
  create(entity: T): Observable<T>;
  update(id: number, entity: T): Observable<T>;
  delete(ids: number[]): Observable<void>;
  getBy(id: number, filter?: BaseFilter): Observable<T>;
  getAll(filter?: BaseFilter): Observable<T[]>;
}
