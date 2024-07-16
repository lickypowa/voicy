import { IService } from 'src/shared/inteface/service.interface';
import { Base } from '../shared/abstract.entity';
import { catchError, from, Observable, of, switchMap, throwError } from 'rxjs';
import { Repository, TypeORMError } from 'typeorm';
import { filterBuilder } from 'src/shared/filter/utils';

export abstract class AbstractService<T extends Base> implements IService<T> {
  constructor(protected organizationRepository: Repository<T>) {}
  /**
   *
   * @param entity
   * @returns
   */
  create(entity: T): Observable<T> {
    return from(this.organizationRepository.save(entity)).pipe(
      catchError((err) => {
        const error = err as TypeORMError;
        return throwError(() => new Error(error.message));
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
    return from(this.organizationRepository.findOne(filter)).pipe(
      switchMap((res) =>
        this.organizationRepository.save({ ...res, ...entity }),
      ),
      catchError((err) => {
        const error = err as TypeORMError;
        return throwError(() => new Error(error.message));
      }),
    );
  }
  delete(ids: number[]): Observable<void> {
    return from(
      this.organizationRepository.delete(ids).catch((err: TypeORMError) => {
        const error = err as TypeORMError;
        return throwError(() => new Error(error.message));
      }),
    ).pipe(
      switchMap(() => {
        return of(void 0);
      }),
    );
  }
  get(id: number): Observable<T> {
    const filter = filterBuilder<T>(id);
    return from(this.organizationRepository.findOne(filter)).pipe(
      catchError((err: TypeORMError) => {
        return throwError(() => new Error(err.message));
      }),
    );
  }
  getAll(): Observable<T[]> {
    return from(this.organizationRepository.find()).pipe(
      catchError((err: TypeORMError) => {
        return throwError(() => new Error(err.message));
      }),
    );
  }
}
