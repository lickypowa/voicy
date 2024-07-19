import { IService } from 'src/shared/inteface/service.interface';
import { Base } from '../shared/abstract.entity';
import { catchError, from, Observable, of, switchMap, throwError } from 'rxjs';
import { Repository, TypeORMError } from 'typeorm';
import { filterBuilder } from 'src/shared/filter/utils';
import { EntityNotFoundError } from 'src/shared/error/entity-not-found';
import { BaseFilter } from 'src/domain/entity/base.filter';

export abstract class AbstractService<T extends Base> implements IService<T> {
  constructor(protected repository: Repository<T>) {}
  /**
   *
   * @param entity
   * @returns
   */
  create(entity: T): Observable<T> {
    return from(this.repository.save(entity)).pipe(
      catchError((err) => {
        const error = err as TypeORMError;
        return throwError(() => error);
      }),
    );
  }
  /**
   *
   * @param entity
   * @returns
   */
  update(entity: T): Observable<T> {
    const filter = filterBuilder<T>(entity.id);
    return from(this.repository.findOne(filter)).pipe(
      switchMap((res) => this.repository.save({ ...res, ...entity })),
      catchError((err) => {
        const error = err as TypeORMError;
        return throwError(() => error);
      }),
    );
  }
  delete(ids: number[]): Observable<void> {
    return from(
      this.repository.delete(ids).catch((err: TypeORMError) => {
        const error = err as TypeORMError;
        return throwError(() => new Error(error.message));
      }),
    ).pipe(
      switchMap(() => {
        return of(void 0);
      }),
    );
  }
  getBy(id: number, filters?: BaseFilter): Observable<T> {
    if (id === undefined) {
      return throwError(() => new Error(`undefined id`));
    }
    const filter = filterBuilder<T>(id, filters);

    return from(this.repository.findOne(filter)).pipe(
      catchError((err: TypeORMError) => {
        return throwError(() => new Error(err.message));
      }),
      switchMap((res) => {
        if (res === null) {
          return throwError(
            () => new EntityNotFoundError(`Entity not found: ${id}`),
          );
        }
        return of(res);
      }),
    );
  }
  getAll(filters?: BaseFilter): Observable<T[]> {
    const filter = filterBuilder<T>(null, filters);
    return from(this.repository.find(filter)).pipe(
      catchError((err: TypeORMError) => {
        return throwError(() => new Error(err.message));
      }),
    );
  }
}
