import { Observable } from 'rxjs';

export interface IService<T> {
  create(entity: T): Observable<T>;
  update(entity: T): Observable<T>;
  delete(ids: number[]): Observable<void>;
  get(id: number): Observable<T>;
  getAll(): Observable<T[]>;
}
