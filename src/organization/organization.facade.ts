import { Inject } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { IFacade } from 'src/shared/inteface/facade.interace';
import { ORGANIZATION_SERVICE_KEY } from './organization.provider';
import { IService } from 'src/shared/inteface/service.interface';
import { Organization } from 'src/domain/entity/organization';
import { OrganizationDao } from 'src/database/entity';
import {
  fromEntityDaoToEntity,
  fromEntityToDao,
} from 'src/shared/mapper/organization/organization.mapper';

export class OrganizationFacade implements IFacade<Organization> {
  constructor(
    @Inject(ORGANIZATION_SERVICE_KEY)
    protected readonly service: IService<OrganizationDao>,
  ) {}

  create(entity: Organization): Observable<Organization> {
    return this.service.create(fromEntityToDao(entity)).pipe(
      map((res) => {
        return fromEntityDaoToEntity(res);
      }),
    );
  }
  update(id: number, entity: Organization): Observable<Organization> {
    throw new Error('Method not implemented.');
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
