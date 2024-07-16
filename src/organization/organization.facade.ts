import { Inject } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { IFacade } from 'src/shared/inteface/facade.interace';
import { ORGANIZATION_SERVICE_KEY } from './organization.provider';
import { IService } from 'src/shared/inteface/service.interface';
import { Organization } from 'src/domain/entity/organization';
import { OrganizationDao } from 'src/database/entity';
import {
  fromOrganizationEntitiesDaoToEntities,
  fromOrganizationEntityDaoToEntity,
  fromOrganizationEntityToDao,
} from 'src/shared/mapper/organization/organization.mapper';

export class OrganizationFacade implements IFacade<Organization> {
  constructor(
    @Inject(ORGANIZATION_SERVICE_KEY)
    protected readonly organizationService: IService<OrganizationDao>,
  ) {}

  create(entity: Organization): Observable<Organization> {
    return this.organizationService
      .create(fromOrganizationEntityToDao(entity))
      .pipe(
        map((res) => {
          return fromOrganizationEntityDaoToEntity(res);
        }),
      );
  }
  update(id: number, entity: Organization): Observable<Organization> {
    if (id !== entity.id) {
      throw new Error('Invalid organization id provided');
    }
    return this.organizationService
      .update(
        fromOrganizationEntityToDao({
          ...entity,
          id: id,
        }),
      )
      .pipe(
        map((res) => {
          return fromOrganizationEntityDaoToEntity(res);
        }),
      );
  }
  delete(ids: number[]): Observable<void> {
    return this.organizationService.delete(ids);
  }
  get(id: number): Observable<Organization> {
    return this.organizationService
      .get(id)
      .pipe(map(fromOrganizationEntityDaoToEntity));
  }
  getAll(): Observable<Organization[]> {
    return this.organizationService
      .getAll()
      .pipe(map(fromOrganizationEntitiesDaoToEntities));
  }
}
