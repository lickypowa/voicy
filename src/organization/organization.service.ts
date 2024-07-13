import { Inject, Injectable } from '@nestjs/common';
import { catchError, from, Observable, switchMap, throwError } from 'rxjs';
import { Organization } from 'src/database/entity/organization.entity';
import { ORGANIZATION_REPOSITORY } from 'src/database/shared/constants/database';
import { IService } from 'src/shared/inteface/service.interface';
import { Repository, TypeORMError } from 'typeorm';

@Injectable()
export class OrganizationService implements IService<Organization> {
  constructor(
    @Inject(ORGANIZATION_REPOSITORY)
    protected readonly repository: Repository<Organization>,
  ) {}
  /**
   *
   * @param entity
   * @returns
   */
  create(entity: Organization): Observable<Organization> {
    return from(this.repository.save(entity)).pipe(
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
  update(entity: Organization): Observable<Organization> {
    return from(this.repository.findOne({ where: { id: entity.id } })).pipe(
      switchMap((res) => this.repository.save({ ...res, ...entity })),
      catchError((err) => {
        const error = err as TypeORMError;
        return throwError(() => new Error(error.message));
      }),
    );
  }
  delete(ids: number[]): Observable<void> {
    throw new Error('Method not implemented.');
  }
  get(id: number): Observable<Organization> {
    throw new Error('Method not implemented.');
  }
  getAll(): Observable<[Organization[], number]> {
    throw new Error('Method not implemented.');
  }
}
