import { Organization } from 'src/database/entity/organization.entity';
import {
  ORGANIZATION_REPOSITORY,
  PG_DATA_SOURCE,
} from 'src/database/shared/constants/database';
import { DataSource, Repository } from 'typeorm';

export const ORGANIZATION_FACADE_KEY = 'IOrganizationFacade';
export const ORGANIZATION_SERVICE_KEY = 'IOrganizationService';

export const organizationProviders = [
  {
    provide: ORGANIZATION_REPOSITORY,
    useFactory: (dataSource: DataSource): Repository<Organization> =>
      dataSource.getRepository(Organization),
    inject: [PG_DATA_SOURCE],
  },
];
