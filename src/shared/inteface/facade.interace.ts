import { Observable } from 'rxjs';

export interface IFacade<T> {
  create(entity: T): Observable<T>;
  update(id: number, entity: T): Observable<T>;
  delete(ids: number[]): Observable<void>;
  get(id: number): Observable<T>;
  getAll(): Observable<[T[], number]>;
}
