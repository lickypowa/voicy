import { Observable } from 'rxjs';
import { BaseFilter } from 'src/domain/entity/base.filter';

export interface IService<T> {
  create(entity: T): Observable<T>;
  update(entity: T): Observable<T>;
  delete(ids: number[]): Observable<void>;
  getBy(id: number, filters?: BaseFilter): Observable<T>;
  getAll(filters?: BaseFilter): Observable<T[]>;
}
